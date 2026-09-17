interface Props {
  page: string;
  onChange: (page: string) => void;
}

export function Sidebar({ page, onChange }: Props) {
  const links = ["Dashboard", "Agent", "Requests", "Tickets", "Knowledge Base"];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">V</div>
        <div>
          <strong>VERIDIAN</strong>
          <span>IT SUPPORT</span>
        </div>
      </div>

      <nav>
        {links.map(link => (
          <button
            key={link}
            className={page === link ? "nav-link active" : "nav-link"}
            onClick={() => onChange(link)}
          >
            {link}
          </button>
        ))}
      </nav>

      <div className="sidebar-note">
        <span className="dot" />
        Service agent online
      </div>
    </aside>
  );
}
