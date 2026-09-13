import { useState } from "react";

const anomalies = [
  {
    id: "#ANM-88204",
    vendor: "Nexis Cloud Infrastructure Ltd.",
    subtitle: "Data Center Ops",
    severity: "Critical",
    score: 87,
    amount: "₹48,50,000",
    time: "12 min ago",
    type: "Unusually large vendor payment and timing spike",
    diagnostic: "Disbursement is 3.4x 90-day baseline; executed off-hours with unverified PO reference.",
    steps: [
      { label: "Data collected", detail: "Payment payload ingested from ERP and banking gateway" },
      { label: "Historical patterns analyzed", detail: "90-day vendor disbursement cadence queried" },
      { label: "Outlier detected", detail: "3.4x standard deviation breach vs historical curve" },
      { label: "Risk score calculated", detail: "Multi-factor risk model weighted against vendor master" },
      { label: "Evidence identified", detail: "Cross-referenced across ERP, GST portal and treasury routing" },
      { label: "Recommendation generated", detail: "Quarantine disbursement and require secondary sign-off" },
    ],
  },
  {
    id: "#ANM-88091",
    vendor: "Microsoft Cloud India",
    subtitle: "Enterprise EA Renewal",
    severity: "Critical",
    score: 82,
    amount: "₹34,10,000",
    time: "2 hours ago",
    type: "Duplicate transaction fingerprint",
    diagnostic: "Identical invoice hash and amount submitted twice within 48 hours across dual entities.",
    steps: [
      { label: "Data collected", detail: "Transaction data ingested from ERP and banking gateway" },
      { label: "Historical patterns analyzed", detail: "Vendor's historical activity and billing curve queried" },
      { label: "Outlier detected", detail: "Duplicate invoice hash found within 48-hour window" },
      { label: "Risk score calculated", detail: "Multi-factor risk model applied" },
      { label: "Evidence identified", detail: "Cross-referenced against vendor master records" },
      { label: "Recommendation generated", detail: "Review and confirmation recommended" },
    ],
  },
  {
    id: "#ANM-88155",
    vendor: "Apex Logistics Mumbai",
    subtitle: "Supply Chain Freight",
    severity: "High",
    score: 76,
    amount: "₹24,80,000",
    time: "Yesterday",
    type: "Vendor spending spike",
    diagnostic: "Monthly freight volume exceeded contracted quarterly run-rate by 142 percent without volume tier rebate.",
    steps: [
      { label: "Data collected", detail: "Transaction data ingested from ERP and banking gateway" },
      { label: "Historical patterns analyzed", detail: "Vendor's historical activity and billing curve queried" },
      { label: "Outlier detected", detail: "Volume spike found vs quarterly run-rate baseline" },
      { label: "Risk score calculated", detail: "Multi-factor risk model applied" },
      { label: "Evidence identified", detail: "Cross-referenced against vendor master records" },
      { label: "Recommendation generated", detail: "Review and confirmation recommended" },
    ],
  },
  {
    id: "#ANM-87940",
    vendor: "Kavya Tech Solutions",
    subtitle: "IT Hardware and Services",
    severity: "High",
    score: 68,
    amount: "₹18,75,000",
    time: "2 days ago",
    type: "Unexpected category change",
    diagnostic: "Vendor category shifted from SaaS Software to High-Value Consulting without vendor master approval.",
    steps: [
      { label: "Data collected", detail: "Transaction data ingested from ERP and banking gateway" },
      { label: "Historical patterns analyzed", detail: "Vendor's historical activity and billing curve queried" },
      { label: "Outlier detected", detail: "Category mismatch found vs vendor master records" },
      { label: "Risk score calculated", detail: "Multi-factor risk model applied" },
      { label: "Evidence identified", detail: "Cross-referenced against vendor master records" },
      { label: "Recommendation generated", detail: "Review and confirmation recommended" },
    ],
  },
  {
    id: "#ANM-87820",
    vendor: "Tata Communications Ltd",
    subtitle: "Network Services",
    severity: "Medium",
    score: 54,
    amount: "₹9,20,000",
    time: "3 days ago",
    type: "Minor billing cycle deviation",
    diagnostic: "Invoice issued 6 days earlier than the standard monthly cycle for this vendor.",
    steps: [
      { label: "Data collected", detail: "Transaction data ingested from ERP and banking gateway" },
      { label: "Historical patterns analyzed", detail: "Vendor's historical activity and billing curve queried" },
      { label: "Outlier detected", detail: "Minor deviation found vs standard billing cycle" },
      { label: "Risk score calculated", detail: "Multi-factor risk model applied" },
      { label: "Evidence identified", detail: "Cross-referenced against vendor master records" },
      { label: "Recommendation generated", detail: "Review and confirmation recommended" },
    ],
  },
];

const kpis = [
  { label: "Critical", value: 7, color: "kpi-critical" },
  { label: "High Risk", value: 14, color: "kpi-high" },
  { label: "Medium Risk", value: 29, color: "kpi-medium" },
  { label: "Resolved (30D)", value: 182, color: "kpi-resolved" },
];

function severityClass(severity) {
  if (severity === "Critical") return "severity-badge severity-critical";
  if (severity === "High") return "severity-badge severity-high";
  return "severity-badge severity-medium";
}

function AnomaliesPage() {
  const [selectedId, setSelectedId] = useState(anomalies[0].id);
  const selected = anomalies.find((a) => a.id === selectedId);

  return (
    <section className="dashboard">
      <div className="anomaly-kpi-grid">
        {kpis.map((k) => (
          <div className={`anomaly-kpi-card ${k.color}`} key={k.label}>
            <span className="anomaly-kpi-label">{k.label}</span>
            <span className="anomaly-kpi-value">{k.value}</span>
          </div>
        ))}
      </div>

      <div className="anomalies-layout">
        <div className="anomaly-feed">
          {anomalies.map((a) => (
            <div
              key={a.id}
              className={`anomaly-feed-item ${a.id === selectedId ? "feed-item-selected" : ""}`}
              onClick={() => setSelectedId(a.id)}
            >
              <div className="feed-item-top">
                <span className={severityClass(a.severity)}>{a.severity.toUpperCase()}</span>
                <span className="feed-score">Score: {a.score}/100</span>
                <span className="feed-id">{a.id}</span>
              </div>

              <h3>{a.vendor}</h3>
              <p className="feed-subtitle">{a.subtitle}</p>

              <div className="feed-item-bottom">
                <span className="feed-amount">{a.amount}</span>
                <span className="feed-time">{a.time}</span>
              </div>

              <div className="feed-diagnostic">
                <strong>{a.type}</strong>
                <p>{a.diagnostic}</p>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="investigation-panel">
            <h3>Anomaly Investigation</h3>
            <p className="investigation-subtitle">{selected.vendor} - {selected.subtitle}</p>

            <div className="investigation-row">
              <span>Risk Score</span>
              <strong className="risk-high-text">{selected.score}/100</strong>
            </div>
            <div className="investigation-row">
              <span>Financial Exposure</span>
              <strong>{selected.amount}</strong>
            </div>

            <div className="investigation-reason">
              <strong>Why was this flagged?</strong>
              <p>{selected.diagnostic}</p>
            </div>

            {selected.steps && (
              <div className="reasoning-timeline">
                <strong>AI Reasoning</strong>
                <div className="timeline-track">
                  {selected.steps.map((step, index) => (
                    <div className="timeline-step" key={index}>
                      <span className="timeline-dot"></span>
                      <div>
                        <span className="timeline-label">{step.label}</span>
                        <p className="timeline-detail">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="explain-button">Explain with AI</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default AnomaliesPage;