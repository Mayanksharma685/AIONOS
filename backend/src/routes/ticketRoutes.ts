import { Router } from "express";
import { TicketController } from "../controllers/TicketController.js";

export function createTicketRoutes(controller: TicketController) {
  const router = Router();
  router.get("/", controller.list);
  router.get("/active", controller.active);
  return router;
}
