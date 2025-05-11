import { Router } from "express";
import { AddTaskController } from "../../../controllers/task/addTask";
import { DateValidatorAdapter } from "../../../dateValidatorAdapter";
import { expressRouteAdapter } from "../../../expressRouteAdapter";

export default (router: Router): void => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const addTaskController = new AddTaskController(dateValidatorAdapter);
  router.post("/tasks", expressRouteAdapter(addTaskController));
};
