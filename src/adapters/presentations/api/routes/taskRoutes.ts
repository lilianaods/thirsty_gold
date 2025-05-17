import { Router } from "express";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import { deleteTaskControllerFactory } from "../../../factories/deleteTaskControllerFactory";
import { taskControllerFactory } from "../../../factories/taskControllerFactory";

export default (router: Router): void => {
  router.post("/tasks", expressRouteAdapter(taskControllerFactory()));
  router.delete(
    "/tasks/:taskId",
    expressRouteAdapter(deleteTaskControllerFactory())
  );
};
