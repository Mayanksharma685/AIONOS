export type TicketState = "active" | "closed";

export class SupportTicket {
  constructor(
    public readonly id: string,
    public readonly employee: string,
    public readonly issueSummary: string,
    public readonly status: string,
    public readonly state: TicketState
  ) {}
}
