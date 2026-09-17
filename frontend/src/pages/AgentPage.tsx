import { useState } from "react";
import { api } from "../services/api";
import { AgentDecision } from "../types";

const examples = [
  "My VPN stopped working this morning, says credentials expired.",
  "Can I get Wi-Fi access for a guest visiting tomorrow?",
  "I think I got a phishing email asking for my login.",
  "Can someone give me admin access to the finance reporting server?",
  "hey can you help, its not working"
];

export function AgentPage() {
  const [message, setMessage] = useState("");
  const [decision, setDecision] = useState<AgentDecision | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze(text = message) {
    if (!text.trim()) return;
    setLoading(true);
    try {
      setDecision(await api.analyze(text));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">VERIDIAN SUPPORT AGENT</p>
          <h1>What can we help with?</h1>
          <p className="muted">The agent uses only the supplied Veridian policy data.</p>
        </div>
      </div>

      <div className="agent-layout">
        <div className="agent-card">
          <label>Employee request</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Describe the IT issue..."
            rows={8}
          />
          <button className="primary-btn wide" onClick={() => analyze()} disabled={loading}>
            {loading ? "Checking policy..." : "Analyze request"}
          </button>

          <div className="examples">
            <span>Try an example</span>
            {examples.map(example => (
              <button key={example} onClick={() => { setMessage(example); analyze(example); }}>
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="decision-card">
          {!decision ? (
            <div className="empty-state">
              <div className="empty-icon">↗</div>
              <h2>Agent decision</h2>
              <p>Enter a request and the policy engine will explain the next step and source policy.</p>
            </div>
          ) : (
            <>
              <div className="decision-top">
                <div>
                  <p className="eyebrow">DECISION</p>
                  <h2>{decision.decision.replaceAll("_", " ")}</h2>
                </div>
                {decision.relatedTicket && <span className="ticket-badge">{decision.relatedTicket}</span>}
              </div>

              <div className="response-box">{decision.response}</div>

              <div className="detail">
                <span>Intent</span>
                <strong>{decision.intent.replaceAll("_", " ")}</strong>
              </div>
              <div className="detail">
                <span>Next step</span>
                <strong>{decision.nextStep}</strong>
              </div>
              <div className="detail">
                <span>Why</span>
                <strong>{decision.reason}</strong>
              </div>

              <div className="sources">
                <p className="eyebrow">POLICY SOURCES</p>
                {decision.policyReferences.length
                  ? decision.policyReferences.map(source => <span key={source}>{source}</span>)
                  : <span>None supplied for this decision</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
