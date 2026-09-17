import { Request, Response } from "express";
import { knowledgeBase } from "../data/knowledgeBase.js";

export class KnowledgeController {
  list = (_req: Request, res: Response) => res.json(knowledgeBase);
}
