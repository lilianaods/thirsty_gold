import {
  DbAddTask,
  LogErrorMongoRepository,
  TaskMongoRepository,
} from "../../dataSources";
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
