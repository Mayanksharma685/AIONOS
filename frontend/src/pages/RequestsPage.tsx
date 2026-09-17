import { EmployeeRequest } from "../types";

export function RequestsPage({ requests }: { requests: EmployeeRequest[] }) {
  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">REQUEST QUEUE</p><h1>Employee requests</h1></div>
      </div>
      <div className="table-panel">
        <table>
          <thead><tr><th>ID</th><th>Employee</th><th>Request</th><th>Initial action</th></tr></thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td><strong>{r.id}</strong></td>
                <td>{r.employee}<br /><small>{r.email}</small></td>
                <td>{r.request}</td>
                <td><span className="status-pill">{r.initialAction}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
