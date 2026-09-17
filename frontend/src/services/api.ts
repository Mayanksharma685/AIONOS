import { AgentDecision, EmployeeRequest, KnowledgePolicy, SupportTicket } from "../types";

const API = "https://backend-woad-three-55.vercel.app/api";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`);
  if (!response.ok) throw new Error("Could not load data");
  return response.json();
}

export const api = {
  requests: () => get<EmployeeRequest[]>("/requests"),
  tickets: () => get<SupportTicket[]>("/tickets"),
  knowledgeBase: () => get<KnowledgePolicy[]>("/kb"),
  analyze: async (message: string): Promise<AgentDecision> => {
    const response = await fetch(`${API}/agent/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    if (!response.ok) throw new Error("Agent could not analyze the request");
    return response.json();
  }
};
