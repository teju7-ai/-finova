import { useState } from "react";

const transactions = [
  { id: "#TXN-1024", vendor: "ABC Technologies", category: "Software", amount: "₹4,50,000", risk: 87, status: "High Risk", detected: "12 min ago", reason: "Transaction amount is 3.4× higher than this vendor's historical average." },
  { id: "#TXN-1025", vendor: "Global Supplies", category: "Operations", amount: "₹1,25,000", risk: 12, status: "Normal", detected: "1 hour ago", reason: "Amount and timing are consistent with this vendor's normal activity." },
  { id: "#TXN-1026", vendor: "Cloud Systems", category: "Infrastructure", amount: "₹2,80,000", risk: 18, status: "Normal", detected: "3 hours ago", reason: "Amount and timing are consistent with this vendor's normal activity." },
  { id: "#TXN-1027", vendor: "ABC Technologies", category: "Software", amount: "₹6,20,000", risk: 91, status: "High Risk", detected: "5 hours ago", reason: "Second unusually large payment to this vendor within the same week." },
  { id: "#TXN-1028", vendor: "Nexis Cloud Infra", category: "Infrastructure", amount: "₹3,10,000", risk: 64, status: "Medium Risk", detected: "1 day ago", reason: "Vendor transaction volume increased 42% over the previous quarter." },
  { id: "#TXN-1029", vendor: "Global Supplies", category: "Operations", amount: "₹95,000", risk: 8, status: "Normal", detected: "2 days ago", reason: "Amount and timing are consistent with this vendor's normal activity." },
];

function riskStatusClass(status) {
  if (status === "High Risk") return "status risk";
  if (status === "Medium Risk") return "status medium";
  return "status normal";
}

function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(transactions[0].id);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.vendor.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selected = transactions.find((t) => t.id === selectedId) || filtered[0];

  return (
    <section className="dashboard">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by vendor or transaction ID..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Normal">Normal</option>
          <option value="Medium Risk">Medium Risk</option>
          <option value="High Risk">High Risk</option>
        </select>
      </div>

      <div className="transactions-layout">
        <div className="transactions-card">
          <div className="section-header">
            <div>
              <h2>All Transactions</h2>
              <p>{filtered.length} of {transactions.length} transactions</p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Risk Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className={t.id === selectedId ? "row-selected" : ""}
                  >
                    <td>{t.id}</td>
                    <td>{t.vendor}</td>
                    <td>{t.category}</td>
                    <td>{t.amount}</td>
                    <td>{t.risk}</td>
                    <td>
                      <span className={riskStatusClass(t.status)}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div className="investigation-panel">
            <h3>Transaction Investigation</h3>

            <div className="investigation-row">
              <span>Transaction</span>
              <strong>{selected.id}</strong>
            </div>
            <div className="investigation-row">
              <span>Vendor</span>
              <strong>{selected.vendor}</strong>
            </div>
            <div className="investigation-row">
              <span>Amount</span>
              <strong>{selected.amount}</strong>
            </div>
            <div className="investigation-row">
              <span>Detected</span>
              <strong>{selected.detected}</strong>
            </div>
            <div className="investigation-row">
              <span>Risk Score</span>
              <strong className={selected.risk >= 70 ? "risk-high-text" : selected.risk >= 40 ? "risk-medium-text" : "risk-low-text"}>
                {selected.risk}/100
              </strong>
            </div>

            <div className="investigation-reason">
              <strong>Why was this flagged?</strong>
              <p>{selected.reason}</p>
            </div>

            <button className="explain-button">✦ Explain with AI</button>

            <div className="investigation-actions">
              <button className="approve-button">Approve</button>
              <button className="reject-button">Reject</button>
              <button className="escalate-button">Escalate</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TransactionsPage;