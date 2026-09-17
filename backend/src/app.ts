import express from "express";
import cors from "cors";
import { PolicyEngine } from "./services/PolicyEngine.js";
import { TicketService } from "./services/TicketService.js";
import { RequestService } from "./services/RequestService.js";
import { VeridianSupportAgent } from "./services/VeridianSupportAgent.js";
import { AgentController } from "./controllers/AgentController.js";
import { RequestController } from "./controllers/RequestController.js";
import { TicketController } from "./controllers/TicketController.js";
import { KnowledgeController } from "./controllers/KnowledgeController.js";
import { createAgentRoutes } from "./routes/agentRoutes.js";
import { createRequestRoutes } from "./routes/requestRoutes.js";
import { createTicketRoutes } from "./routes/ticketRoutes.js";
import { createKnowledgeRoutes } from "./routes/knowledgeRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const ticketService = new TicketService();
const requestService = new RequestService();
const policyEngine = new PolicyEngine();
const veridianSupportAgent = new VeridianSupportAgent(policyEngine, ticketService);

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "Veridian IT Support Agent" }));

app.use("/api/agent", createAgentRoutes(new AgentController(veridianSupportAgent)));
app.use("/api/requests", createRequestRoutes(new RequestController(requestService)));
app.use("/api/tickets", createTicketRoutes(new TicketController(ticketService)));
app.use("/api/kb", createKnowledgeRoutes(new KnowledgeController()));

export default app;
