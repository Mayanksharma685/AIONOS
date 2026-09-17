import { Request, Response } from "express";
import { RequestService } from "../services/RequestService.js";

export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  list = (_req: Request, res: Response) => {
    return res.json(this.requestService.getAll());
  };

  getOne = (req: Request, res: Response) => {
    const requestId = String(req.params.id);

    const item = this.requestService.getById(requestId);

    if (!item) {
      return res.status(404).json({ error: "Request not found" });
    }

    return res.json(item);
  };
}