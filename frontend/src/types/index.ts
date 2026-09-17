export interface EmployeeRequest {
  id: string;
  employee: string;
  email: string;
  dateOpened: string;
  request: string;
  initialAction: string;
}

export interface SupportTicket {
  id: string;
  employee: string;
  issueSummary: string;
  status: string;
  state: "active" | "closed";
}

export interface KnowledgePolicy {
  id: string;
  title: string;
  policy: string;
}

export interface AgentDecision {
  intent: string;
  decision: string;
  nextStep: string;
  reason: string;
  response: string;
  policyReferences: string[];
  relatedTicket?: string;
}
