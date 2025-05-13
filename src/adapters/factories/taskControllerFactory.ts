import { DbAddTask } from "../../dataSources/db/dbAddTask";
import { LogErrorMongoRepository } from "../../dataSources/db/repository/logErrorMongoRepository";
import { TaskMongoRepository } from "../../dataSources/db/repository/taskMongoRepository";
import { AddTaskController } from "../controllers/task/addTask";
import { LogErrorControllerDecorator } from "../decorators/logErrorControllerDecorator";
import { addTaskValidationCompositeFactory } from "./addTaskValidationCompositeFactory";

export const taskControllerFactory = () => {
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);

  const logErrorRepository = new LogErrorMongoRepository();

  const taskController = new AddTaskController(
    dbAddTask,
    addTaskValidationCompositeFactory()
  );
  return new LogErrorControllerDecorator(taskController, logErrorRepository);
};
