export type DecisionType =
  | "SELF_SERVICE"
  | "EMPLOYEE_ACTION"
  | "IT_ACTION"
  | "SECURITY_REVIEW"
  | "FINANCE_REVIEW"
  | "MANAGER_APPROVAL"
  | "HUMAN_REVIEW"
  | "CLARIFICATION";

export class AgentDecision {
  constructor(
    public readonly intent: string,
    public readonly decision: DecisionType,
    public readonly nextStep: string,
    public readonly reason: string,
    public readonly response: string,
    public readonly policyReferences: string[],
    public readonly relatedTicket?: string
  ) {}
}
