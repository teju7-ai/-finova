import { useLocation } from "react-router-dom";

const pageInfo = {
  "/": { crumb: "Overview / Dashboard", title: "Financial Overview" },
  "/transactions": { crumb: "Overview / Transactions", title: "Transactions" },
  "/anomalies": { crumb: "Intelligence / Anomalies", title: "Anomalies" },
  "/forecast": { crumb: "Intelligence / Forecast", title: "Forecast" },
  "/budget": { crumb: "Intelligence / Budget", title: "Budget" },
  "/vendors": { crumb: "Intelligence / Vendors", title: "Vendors" },
  "/assistant": { crumb: "Intelligence / AI Assistant", title: "AI Assistant" },
  "/settings": { crumb: "Settings", title: "Settings" },
};

function Header() {
  const location = useLocation();
  const current = pageInfo[location.pathname] || pageInfo["/"];

  return (
    <header className="header">
      <div>
        <p className="breadcrumb">{current.crumb}</p>
        <h1>{current.title}</h1>
      </div>

      <div className="header-actions">
        <button className="notification">🔔</button>
        <button className="ai-button">✦ Ask FINOVA AI</button>
      </div>
    </header>
  );
}

export default Header;