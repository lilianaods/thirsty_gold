import { ObjectId } from "mongodb";
import { InvalidParamError } from "../../../adapters/presentations/api/errors/invalid-param-error";
import { NotFoundError } from "../../../adapters/presentations/api/errors/not-found-error";
import { Task } from "../../../entities/task";
import { AddATaskModel } from "../../../usecases/addTask";
import { DeleteTaskModel } from "../../../usecases/deleteTask";
import { AddTaskRepository } from "../../../usecases/repository/addTaskRepository";
import { DeleteTaskRepository } from "../../../usecases/repository/deleteTaskRepository";
import { MongoManager } from "../../config/MongoManager";

export class TaskMongoRepository
implements AddTaskRepository, DeleteTaskRepository
{
  async delete(taskData: DeleteTaskModel): Promise<Error | void> {
    if (ObjectId.isValid(taskData.id) === false) {
      return new InvalidParamError(taskData.id);
    }

    const taskCollection = MongoManager.getInstance().getCollection("tasks");
    const { deletedCount } = await taskCollection.deleteOne({
      _id: new ObjectId(taskData.id),
    });

    if (deletedCount === 0) {
      return new NotFoundError("task");
    }
    return;
  }

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
