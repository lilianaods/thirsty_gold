import {
  DbDeleteTask,
  LogErrorMongoRepository,
  TaskMongoRepository,
} from "../../dataSources";
import { DeleteTaskController } from "../controllers/task/deleteTask";
import { LogErrorControllerDecorator } from "../decorators/logErrorControllerDecorator";
import { RequiredFieldsValidation } from "../validations/requiredFieldsValidation";

export function deleteTaskControllerFactory() {
  const taskMongoRepository = new TaskMongoRepository();
  const dbDeleteTask = new DbDeleteTask(taskMongoRepository);

  const deleteTaskController = new DeleteTaskController(
    dbDeleteTask,
    new RequiredFieldsValidation("id")
  );
  const logErrorRepository = new LogErrorMongoRepository();

  return new LogErrorControllerDecorator(
    deleteTaskController,
    logErrorRepository
  );
}
