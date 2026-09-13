const forecastKpis = [
  { label: "Projected Revenue (Q4)", value: "₹15.8M", change: "+9.2%", positive: true },
  { label: "Projected Expenses (Q4)", value: "₹8.1M", change: "+3.1%", positive: false },
  { label: "Projected Cash Flow (Q4)", value: "₹6.4M", change: "+11.5%", positive: true },
  { label: "Forecast Confidence", value: "82%", change: "High", positive: true },
];

// Historical months (actual data) followed by forecast months (predicted data)
const chartData = [
  { label: "May", value: 55, forecast: false },
  { label: "Jun", value: 68, forecast: false },
  { label: "Jul", value: 63, forecast: false },
  { label: "Aug", value: 75, forecast: false },
  { label: "Sep", value: 70, forecast: false },
  { label: "Oct", value: 82, forecast: false },
  { label: "Nov", value: 88, forecast: true },
  { label: "Dec", value: 94, forecast: true },
  { label: "Jan", value: 91, forecast: true },
  { label: "Feb", value: 98, forecast: true },
];

function ForecastPage() {
  return (
    <section className="dashboard">
      <div className="kpi-grid">
        {forecastKpis.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-header">
              <span>{k.label}</span>
            </div>
            <h2>{k.value}</h2>
            <p className={k.positive ? "positive" : "negative"}>{k.change}</p>
            <span className="comparison">projected</span>
          </div>
        ))}
      </div>

      <div className="chart-card">
        <div className="section-header">
          <div>
            <h2>Financial Trajectory &amp; Confidence Corridor</h2>
            <p>Historical performance and AI-projected forecast</p>
          </div>
        </div>

        <div className="forecast-chart">
          {chartData.map((point, index) => (
            <div className="forecast-bar-wrap" key={index}>
              <div
                className={point.forecast ? "forecast-bar bar-forecast" : "forecast-bar bar-actual"}
                style={{ height: `${point.value}%` }}
              />
            </div>
          ))}
        </div>

        <div className="chart-labels">
          {chartData.map((point, index) => (
            <span key={index}>{point.label}</span>
          ))}
        </div>

        <div className="forecast-legend">
          <span className="legend-item"><span className="legend-dot legend-actual"></span> Historical</span>
          <span className="legend-item"><span className="legend-dot legend-forecast"></span> Forecast</span>
        </div>
      </div>
    </section>
  );
}

export default ForecastPage;