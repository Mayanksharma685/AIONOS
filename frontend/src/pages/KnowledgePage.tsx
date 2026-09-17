import { KnowledgePolicy } from "../types";

export function KnowledgePage({ policies }: { policies: KnowledgePolicy[] }) {
  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">SOURCE OF TRUTH</p><h1>Knowledge base</h1><p className="muted">Supplied Veridian policies used by the prototype.</p></div>
      </div>
      <div className="kb-grid">
        {policies.map(policy => (
          <article className="panel kb-card" key={policy.id}>
            <div className="kb-id">{policy.id}</div>
            <h3>{policy.title}</h3>
            <p>{policy.policy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
