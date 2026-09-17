import { Router } from "express";
import { KnowledgeController } from "../controllers/KnowledgeController.js";

export function createKnowledgeRoutes(controller: KnowledgeController) {
  const router = Router();
  router.get("/", controller.list);
  return router;
}
