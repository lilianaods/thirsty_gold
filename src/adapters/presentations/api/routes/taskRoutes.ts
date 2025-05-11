import { Router } from "express";
import { DbAddTask } from "../../../../dataSources/db/dbAddTask";
import { TaskMongoRepository } from "../../../../dataSources/db/repository/taskMongoRepository";
import { AddTaskController } from "../../../controllers/task/addTask";
import { DateValidatorAdapter } from "../../../dateValidatorAdapter";
import { expressRouteAdapter } from "../../../expressRouteAdapter";

export default (router: Router): void => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);

  const addTaskController = new AddTaskController(
    dbAddTask,
    dateValidatorAdapter
  );
  router.post("/tasks", expressRouteAdapter(addTaskController));
};
