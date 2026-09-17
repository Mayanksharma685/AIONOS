import { knowledgeBase } from "../data/knowledgeBase.js";
import { AgentDecision } from "../models/AgentDecision.js";
import { PolicyEngine } from "./PolicyEngine.js";
import { TicketService } from "./TicketService.js";

export class VeridianSupportAgent {
  constructor(
    private readonly policyEngine: PolicyEngine,
    private readonly ticketService: TicketService
  ) {}

  analyze(message: string): AgentDecision {
    const decision = this.policyEngine.decide(message);
    const relatedTicket = this.findRelatedTicket(message);

    if (relatedTicket) {
      return new AgentDecision(
        decision.intent,
        decision.decision,
        decision.nextStep,
        `${decision.reason} An existing ticket, ${relatedTicket.id}, matches the issue.`,
        `${decision.response} Existing ticket context: ${relatedTicket.id} — ${relatedTicket.status}.`,
        decision.policyReferences,
        relatedTicket.id
      );
    }

    return decision;
  }

  getPolicyCount() {
    return knowledgeBase.length;
  }

private findRelatedTicket(message: string) {
  const text = message.toLowerCase();

  const ticketKeywords: Record<string, string[]> = {
    "TK-1043": ["laptop replacement", "replacement", "3.2 yrs"],
    "TK-1044": ["non-catalog", "software catalog", "software request"],
    "TK-1047": ["home office", "home equipment", "monitor", "chair"],
    "TK-1048": ["phishing", "suspicious email", "security incident"]
  };

  const activeTickets = this.ticketService.getActive();

  return activeTickets.find(ticket => {
    const keywords = ticketKeywords[ticket.id] || [];

    return keywords.some(keyword => text.includes(keyword));
  });
}
}