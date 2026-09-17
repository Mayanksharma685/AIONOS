import { Router } from "express";
import { AgentController } from "../controllers/AgentController.js";

export function createAgentRoutes(controller: AgentController) {
  const router = Router();
  router.post("/analyze", controller.analyze);
  return router;
}
