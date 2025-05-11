import { Task } from "../../../entities/task";
import { AddATaskModel } from "../../../usecases/addTask";
import { AddTaskRepository } from "../../../usecases/repository/addTaskRepository";
import { MongoManager } from "../../config/MongoManager";

export class TaskMongoRepository implements AddTaskRepository {
  async add(taskData: AddATaskModel): Promise<Task> {
    const taskCollection = MongoManager.getInstance().getCollection("tasks");
    const { insertedId } = await taskCollection.insertOne(taskData);

    const task = await taskCollection.findOne({ _id: insertedId });
    if (!task) {
      throw new Error("Task not found");
    }

    return {
      id: task._id.toHexString(),
      title: task.title,
      description: task.description,
      date: task.date,
    };
  }
}
