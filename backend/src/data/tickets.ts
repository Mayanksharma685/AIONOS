import { SupportTicket } from "../models/SupportTicket.js";

export const tickets = [
  new SupportTicket("TK-1042", "R. Verma", "VPN credential expired", "Resolved (closed)", "closed"),
  new SupportTicket("TK-1043", "S. Iyer", "Laptop replacement (3.2 yrs old)", "Approved — pending fulfillment", "active"),
  new SupportTicket("TK-1044", "A. Khan", "Non-catalog software request", "Pending Security review", "active"),
  new SupportTicket("TK-1045", "P. Joshi", "Mailbox quota increase", "Approved at 35GB (closed)", "closed"),
  new SupportTicket("TK-1046", "M. Das", "Printer paper jam, floor 2", "Resolved (closed)", "closed"),
  new SupportTicket("TK-1047", "K. Singh", "Home office equipment request", "Pending Finance", "active"),
  new SupportTicket("TK-1048", "T. Rao", "Phishing email reported", "Escalated to Security — under investigation", "active"),
  new SupportTicket("TK-1049", "T. Rao", "Password reset", "Resolved (closed)", "closed"),
  new SupportTicket("TK-1050", "J. Fernandes", "Admin access request", "Rejected — no business justification provided (closed)", "closed"),
  new SupportTicket("TK-1051", "L. Menon", "Guest Wi-Fi issued", "Resolved (closed)", "closed")
];
