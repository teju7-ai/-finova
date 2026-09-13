const kpis = [
  { title: "Revenue", value: "₹12.4M", change: "+12.5%", positive: true },
  { title: "Expenses", value: "₹7.2M", change: "+4.3%", positive: false },
  { title: "Cash Flow", value: "₹5.2M", change: "+8.7%", positive: true },
  { title: "Risk Score", value: "72", change: "Medium", positive: false },
];

const transactions = [
  { id: "#TXN-1024", vendor: "ABC Technologies", category: "Software", amount: "₹4,50,000", status: "High Risk" },
  { id: "#TXN-1025", vendor: "Global Supplies", category: "Operations", amount: "₹1,25,000", status: "Normal" },
  { id: "#TXN-1026", vendor: "Cloud Systems", category: "Infrastructure", amount: "₹2,80,000", status: "Normal" },
  { id: "#TXN-1027", vendor: "ABC Technologies", category: "Software", amount: "₹6,20,000", status: "High Risk" },
];

function KPICard({ title, value, change, positive }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span>{title}</span>
        <span className="kpi-icon">↗</span>
      </div>
      <h2>{value}</h2>
      <p className={positive ? "positive" : "negative"}>{change}</p>
      <span className="comparison">vs. previous month</span>
    </div>
  );
}

function RevenueChart() {
  const chartData = [40, 48, 42, 58, 55, 68, 63, 75, 70, 82, 78, 92];

  return (
    <div className="chart-card">
      <div className="section-header">
        <div>
          <h2>Revenue Overview</h2>
          <p>Monthly revenue performance</p>
        </div>
        <select>
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="chart">
        {chartData.map((height, index) => (
          <div className="bar" key={index} style={{ height: `${height}%` }} />
        ))}
      </div>

      <div className="chart-labels">
        <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
        <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
        <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
      </div>
    </div>
  );
}

function AnomalyCard() {
  return (
    <div className="anomaly-card">
      <div className="anomaly-top">
        <div className="warning-icon">!</div>
        <div>
          <span className="risk-label">HIGH RISK</span>
          <h3>Unusual transaction detected</h3>
        </div>
        <span className="risk-score">87</span>
      </div>

      <div className="anomaly-details">
        <div><span>Vendor</span><strong>ABC Technologies</strong></div>
        <div><span>Amount</span><strong>₹4,50,000</strong></div>
        <div><span>Detected</span><strong>12 min ago</strong></div>
      </div>

      <div className="anomaly-reason">
        <strong>Why was this flagged?</strong>
        <p>Transaction amount is 3.4× higher than this vendor's historical average.</p>
      </div>

      <button className="explain-button">✦ Explain with AI</button>
    </div>
  );
}

function TransactionsTable() {
  return (
    <div className="transactions-card">
      <div className="section-header">
        <div>
          <h2>Recent Transactions</h2>
          <p>Latest financial activity</p>
        </div>
        <button className="view-button">View all</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Vendor</th><th>Category</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.vendor}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>
                  <span className={transaction.status === "High Risk" ? "status risk" : "status normal"}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <section className="dashboard">
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} title={kpi.title} value={kpi.value} change={kpi.change} positive={kpi.positive} />
        ))}
      </div>

      <RevenueChart />
      <AnomalyCard />
      <TransactionsTable />
    </section>
  );
}

export default DashboardPage;