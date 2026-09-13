import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-mark">F</div>
        <div>
          <h2>FINOVA</h2>
          <span>Financial Intelligence</span>
        </div>
      </div>

      <nav>
        <p className="nav-label">OVERVIEW</p>

        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>⌂</span> Dashboard
        </NavLink>

        <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>↔</span> Transactions
        </NavLink>

        <NavLink to="/anomalies" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>⚠</span> Anomalies
        </NavLink>

        <p className="nav-label">INTELLIGENCE</p>

        <NavLink to="/forecast" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>◴</span> Forecast
        </NavLink>

        <NavLink to="/budget" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>▣</span> Budget
        </NavLink>

        <NavLink to="/vendors" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>◉</span> Vendors
        </NavLink>

        <NavLink to="/assistant" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>✦</span> AI Assistant
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>⚙</span> Settings
        </NavLink>

        <div className="user-card">
          <div className="avatar">T</div>
          <div>
            <strong>Teju</strong>
            <span>Finance Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;