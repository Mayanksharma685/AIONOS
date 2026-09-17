import { Router } from "express";
import { RequestController } from "../controllers/RequestController.js";

export function createRequestRoutes(controller: RequestController) {
  const router = Router();
  router.get("/", controller.list);
  router.get("/:id", controller.getOne);
  return router;
}
