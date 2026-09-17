import { Request, Response } from "express";
import { VeridianSupportAgent } from "../services/VeridianSupportAgent.js";

export class AgentController {
  constructor(private readonly agent: VeridianSupportAgent) {}

  analyze = (req: Request, res: Response) => {
    const message = typeof req.body?.message === "string" ? req.body.message : "";

    if (!message.trim()) {
      return res.status(400).json({ error: "message is required" });
    }

    return res.json(this.agent.analyze(message));
  };
}
