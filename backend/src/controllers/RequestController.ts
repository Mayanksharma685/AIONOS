import { Request, Response } from "express";
import { RequestService } from "../services/RequestService.js";

export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  list = (_req: Request, res: Response) => res.json(this.requestService.getAll());

  getOne = (req: Request, res: Response) => {
    const item = this.requestService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: "Request not found" });
    return res.json(item);
  };
}
