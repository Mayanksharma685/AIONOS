import { Request, Response } from "express";
import { TicketService } from "../services/TicketService.js";

export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  list = (_req: Request, res: Response) => res.json(this.ticketService.getAll());

  active = (_req: Request, res: Response) => res.json(this.ticketService.getActive());
}
