import { tickets } from "../data/tickets.js";
import { SupportTicket } from "../models/SupportTicket.js";

export class TicketService {
  getAll(): SupportTicket[] {
    return tickets;
  }

  getActive(): SupportTicket[] {
    return tickets.filter(ticket => ticket.state === "active");
  }

  getById(id: string): SupportTicket | undefined {
    return tickets.find(ticket => ticket.id === id);
  }
}
