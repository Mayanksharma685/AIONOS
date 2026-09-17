import { SupportTicket } from "../types";

export function TicketsPage({ tickets }: { tickets: SupportTicket[] }) {
  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">TICKET QUEUE</p><h1>Existing tickets</h1></div>
      </div>
      <div className="ticket-grid">
        {tickets.map(ticket => (
          <div className="panel ticket-card" key={ticket.id}>
            <div className="ticket-card-top">
              <strong>{ticket.id}</strong>
              <span className={ticket.state === "active" ? "active-state" : "closed-state"}>
                {ticket.state}
              </span>
            </div>
            <h3>{ticket.issueSummary}</h3>
            <p className="muted">{ticket.employee}</p>
            <div className="ticket-status">{ticket.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
