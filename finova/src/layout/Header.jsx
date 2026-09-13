function Header() {
  return (
    <header className="header">
      <div>
        <p className="breadcrumb">Overview / Dashboard</p>
        <h1>Financial Overview</h1>
      </div>

      <div className="header-actions">
        <button className="notification">🔔</button>
        <button className="ai-button">✦ Ask FINOVA AI</button>
      </div>
    </header>
  );
}

export default Header;