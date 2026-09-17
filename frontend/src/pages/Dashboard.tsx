import { EmployeeRequest, SupportTicket } from "../types";
import { StatusPill } from "../components/StatusPill";

interface Props {
  requests: EmployeeRequest[];
  tickets: SupportTicket[];
  goAgent: () => void;
}

export function Dashboard({ requests, tickets, goAgent }: Props) {
  const active = tickets.filter(t => t.state === "active").length;
  const security = requests.filter(r => r.request.toLowerCase().includes("phishing")).length;
  const pending = requests.filter(r =>
    /approval|security review|pending|finance/i.test(r.initialAction)
  ).length;

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">INTERNAL SERVICE DESK</p>
          <h1>Support overview</h1>
          <p className="muted">Veridian Corp · Assignment 2 · Week of 21–25 Sep 2026</p>
        </div>
        <button className="primary-btn" onClick={goAgent}>Open agent</button>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><span>Employee requests</span><strong>{requests.length}</strong></div>
        <div className="stat-card"><span>Active tickets</span><strong>{active}</strong></div>
        <div className="stat-card"><span>Security cases</span><strong>{security}</strong></div>
        <div className="stat-card"><span>Requests needing review</span><strong>{pending}</strong></div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">RECENT REQUESTS</p>
              <h2>Employee queue</h2>
            </div>
            <StatusPill>{`${requests.length} loaded`}</StatusPill>
          </div>
          {requests.slice(0, 6).map(request => (
            <div className="list-row" key={request.id}>
              <div>
                <strong>{request.id} · {request.employee}</strong>
                <p>{request.request}</p>
              </div>
              <small>{request.initialAction}</small>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">ACTIVE QUEUE</p>
              <h2>Tickets needing attention</h2>
            </div>
          </div>
          {tickets.filter(t => t.state === "active").map(ticket => (
            <div className="ticket-row" key={ticket.id}>
              <div className="ticket-code">{ticket.id}</div>
              <div>
                <strong>{ticket.issueSummary}</strong>
                <p>{ticket.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
