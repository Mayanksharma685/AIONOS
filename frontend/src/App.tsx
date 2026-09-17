import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { api } from "./services/api";
import { EmployeeRequest, KnowledgePolicy, SupportTicket } from "./types";
import { Dashboard } from "./pages/Dashboard";
import { AgentPage } from "./pages/AgentPage";
import { RequestsPage } from "./pages/RequestsPage";
import { TicketsPage } from "./pages/TicketsPage";
import { KnowledgePage } from "./pages/KnowledgePage";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [requests, setRequests] = useState<EmployeeRequest[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [policies, setPolicies] = useState<KnowledgePolicy[]>([]);

  useEffect(() => {
    Promise.all([api.requests(), api.tickets(), api.knowledgeBase()])
      .then(([r, t, k]) => {
        setRequests(r);
        setTickets(t);
        setPolicies(k);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app-shell">
      <Sidebar page={page} onChange={setPage} />
      <main className="main-content">
        <header className="topbar">
          <span>Internal tools</span>
          <span className="top-status"><i /> Veridian support environment</span>
        </header>

        {page === "Dashboard" && <Dashboard requests={requests} tickets={tickets} goAgent={() => setPage("Agent")} />}
        {page === "Agent" && <AgentPage />}
        {page === "Requests" && <RequestsPage requests={requests} />}
        {page === "Tickets" && <TicketsPage tickets={tickets} />}
        {page === "Knowledge Base" && <KnowledgePage policies={policies} />}
      </main>
    </div>
  );
}
