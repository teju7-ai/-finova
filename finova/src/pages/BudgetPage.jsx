import React, { useState } from 'react';

export default function BudgetPage() {
  // Scenario Management State
  const [activeScenario, setActiveScenario] = useState('current'); // 'current' | 'optimization' | 'growth'
  const [fiscalPeriod, setFiscalPeriod] = useState('Q4 FY 2024-25');
  const [currency, setCurrency] = useState('INR (₹)');
  const [activeTab, setActiveTab] = useState('Scenario Lab');
  
  // Interactive modal / mitigation action states
  const [mitigationModalOpen, setMitigationModalOpen] = useState(false);
  const [selectedMitigationItem, setSelectedMitigationItem] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // Financial baseline data
  const baseBudgetData = {
    totalBudget: 28.5, // Cr
    actualSpend: 18.4, // Cr
    remainingBudget: 10.1, // Cr
    forecastVariance: 1.82, // Cr overspend
    runwayDays: 42,
    departments: [
      { id: 'ENG-CC-101', name: 'Technology & Engineering', alloc: 9.2, act: 7.8, fcst: 10.9, risk: 'High Risk', consumed: 71.5, variance: '+18.4%' },
      { id: 'INF-CC-204', name: 'Infrastructure & Cloud', alloc: 6.4, act: 5.1, fcst: 7.2, risk: 'Warning', consumed: 79.7, variance: '+12.5%' },
      { id: 'OPS-CC-302', name: 'Operations & Logistics', alloc: 5.0, act: 3.2, fcst: 4.8, risk: 'On Track', consumed: 64.0, variance: '-4.0%' },
      { id: 'MKT-CC-401', name: 'Growth & Marketing', alloc: 4.2, act: 1.9, fcst: 3.1, risk: 'Surplus', consumed: 45.2, variance: '-26.2%' },
      { id: 'HR-CC-505', name: 'Human Resources & Talent', alloc: 2.5, act: 1.6, fcst: 2.4, risk: 'Balanced', consumed: 64.0, variance: '-4.0%' },
      { id: 'GA-CC-601', name: 'General & Contingency Reserve', alloc: 1.2, act: 0.5, fcst: 0.9, risk: 'Optimal', consumed: 41.6, variance: 'Optimal' },
    ]
  };

  const getScenarioData = () => {
    if (activeScenario === 'optimization') {
      return {
        ...baseBudgetData,
        totalBudget: 26.5,
        actualSpend: 17.5,
        remainingBudget: 9.0,
        forecastVariance: 0.35,
      };
    } else if (activeScenario === 'growth') {
      return {
        ...baseBudgetData,
        totalBudget: 32.0,
        actualSpend: 19.8,
        remainingBudget: 12.2,
        forecastVariance: 2.40,
      };
    }
    return baseBudgetData;
  };

  const data = getScenarioData();

  const handleMitigateClick = (itemTitle) => {
    setSelectedMitigationItem(itemTitle);
    setMitigationModalOpen(true);
  };

  const confirmMitigation = () => {
    setSuccessToast(`Successfully executed AI mitigation for: ${selectedMitigationItem}`);
    setMitigationModalOpen(false);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  return (
    <div className="budget-page-container">
      {/* Toast Notification */}
      {successToast && (
        <div className="budget-toast">
          <span className="budget-toast-icon">✨</span>
          <span>{successToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE HEADER & CONTROLS */}
      {/* ========================================================================= */}
      <header className="budget-header">
        <div className="budget-header-left">
          <div className="budget-breadcrumb">
            <span>COMMAND CENTER</span>
            <span className="budget-separator">/</span>
            <span>BUDGET &amp; CAPITAL ALLOCATION</span>
          </div>
          <div className="budget-title-row">
            <h1 className="budget-title">Budget Intelligence</h1>
            <span className="budget-live-badge">
              <span className="budget-live-dot"></span>
              LIVE SYNCHRONIZED
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="budget-sub-nav">
          <button 
            className={`budget-nav-link ${activeTab === 'Real-Time Feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('Real-Time Feed')}
          >
            Real-Time
          </button>
          <button 
            className={`budget-nav-link ${activeTab === 'Ledger Audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('Ledger Audit')}
          >
            Audit
          </button>
          <button 
            className={`budget-nav-link ${activeTab === 'Scenario Lab' ? 'active' : ''}`}
            onClick={() => setActiveTab('Scenario Lab')}
          >
            Scenario Lab
          </button>
        </nav>

        {/* Right Trailing Action Bar */}
        <div className="budget-header-actions">
          <div className="budget-scenario-pills">
            <button 
              className={`budget-pill ${activeScenario === 'current' ? 'active' : ''}`}
              onClick={() => setActiveScenario('current')}
            >
              Current
            </button>
            <button 
              className={`budget-pill ${activeScenario === 'optimization' ? 'active' : ''}`}
              onClick={() => setActiveScenario('optimization')}
            >
              Optimize
            </button>
            <button 
              className={`budget-pill ${activeScenario === 'growth' ? 'active' : ''}`}
              onClick={() => setActiveScenario('growth')}
            >
              Growth
            </button>
          </div>

          <div className="budget-dropdown-pill" onClick={() => setFiscalPeriod(fiscalPeriod === 'Q4 FY 2024-25' ? 'Q1 FY 2025-26' : 'Q4 FY 2024-25')}>
            <span>📅</span>
            <span>{fiscalPeriod.replace('FY ', '')}</span>
            <span>▾</span>
          </div>

          <div className="budget-dropdown-pill currency" onClick={() => setCurrency(currency === 'INR (₹)' ? 'USD ($)' : 'INR (₹)')}>
            <span>{currency.split(' ')[0]}</span>
            <span>▾</span>
          </div>

          <button className="budget-btn-primary" onClick={() => alert('AI Budget Assistant: Analyzing Q4 variances across Engineering and Cloud infrastructure...')}>
            <span>✨</span>
            <span>AI Explain</span>
          </button>
        </div>
      </header>

      {/* Subtitle & Operational Indicator Strip */}
      <div className="budget-subbar">
        <p className="budget-subbar-desc">Monitor spending, identify budget risks and optimize allocation with AI</p>
        <div className="budget-subbar-meta">
          <span>🟢 01 Oct 2024 - 31 Mar 2025</span>
          <span className="budget-divider">|</span>
          <span>AUDIT HASH: <span className="budget-mono-text">#0x8F4A..77C1</span></span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <main className="budget-main-content">
        
        {/* TOP KPI CARDS MATRIX */}
        <section className="budget-kpi-grid">
          <div className="budget-card">
            <div className="budget-card-header">
              <span>TOTAL BUDGET</span>
              <span className="budget-indicator-dot"></span>
            </div>
            <div className="budget-kpi-value-row">
              <span className="budget-kpi-num">₹{data.totalBudget} Cr</span>
              <span className="budget-tag primary">Q4 FY25 Cap</span>
            </div>
            <div className="budget-progress-block">
              <div className="budget-progress-labels">
                <span>Overall Utilization</span>
                <span className="budget-bold">78.2%</span>
              </div>
              <div className="budget-progress-track">
                <div className="budget-progress-fill" style={{ width: '78.2%' }}></div>
              </div>
            </div>
            <div className="budget-card-footer">Approved Q4 FY25 Cap</div>
          </div>

          <div className="budget-card">
            <div className="budget-card-header">
              <span>ACTUAL SPEND</span>
              <span className="budget-trend-up">+6.4% ↗</span>
            </div>
            <div className="budget-kpi-value-row">
              <span className="budget-kpi-num">₹{data.actualSpend} Cr</span>
              <div className="budget-mini-sparkline"></div>
            </div>
            <div className="budget-card-subinfo">
              <span>+6.4% M-o-M pacing</span>
              <span className="budget-text-secondary">Pacing Delta</span>
            </div>
            <div className="budget-card-footer">Run-rate: ₹6.13 Cr/month</div>
          </div>

          <div className="budget-card">
            <div className="budget-card-header">
              <span>REMAINING BUDGET</span>
              <span className="budget-tag primary">Healthy Buffer</span>
            </div>
            <div className="budget-kpi-value-row">
              <span className="budget-kpi-num primary-color">₹{data.remainingBudget} Cr</span>
              <span className="budget-text-muted">35.4% Left</span>
            </div>
            <div className="budget-progress-block">
              <div className="budget-progress-labels">
                <span>Runway Velocity</span>
                <span>{data.runwayDays} operating days</span>
              </div>
              <div className="budget-progress-track">
                <div className="budget-progress-fill cyan" style={{ width: '35.4%' }}></div>
              </div>
            </div>
            <div className="budget-card-footer">Runway: {data.runwayDays} operating days remaining</div>
          </div>

          <div className="budget-card alert-card">
            <div className="budget-card-header alert-header">
              <span>FORECAST VARIANCE</span>
              <span className="budget-tag alert-tag">⚠️ High Risk</span>
            </div>
            <div className="budget-kpi-value-row">
              <span className="budget-kpi-num alert-color">+₹{data.forecastVariance} Cr</span>
              <span className="budget-tag alert-tag">+6.4% delta</span>
            </div>
            <div className="budget-card-subinfo">
              <span className="budget-text-muted">Projected Overspend</span>
              <span>Confidence: 96.4%</span>
            </div>
            <div className="budget-card-footer alert-color">High Risk of Breach in Tech &amp; Cloud</div>
          </div>
        </section>

        {/* MAIN VISUALIZATIONS GRID */}
        <section className="budget-content-grid">
          
          <div className="budget-left-column">
            
            <div className="budget-section-card">
              <div className="budget-section-header">
                <div>
                  <h2 className="budget-section-title">Departmental Capital Allocation</h2>
                  <p className="budget-section-subtitle">Budget vs Actual vs Forecast across primary business cost centers</p>
                </div>
                <div className="budget-legend">
                  <span className="legend-item"><span className="dot primary-dot"></span> Actual</span>
                  <span className="legend-item"><span className="line-dot"></span> Budget Target</span>
                  <span className="legend-item"><span className="dash-dot"></span> AI Forecast</span>
                </div>
              </div>

              <div className="budget-dept-list">
                {data.departments.map((dept, index) => (
                  <div key={index} className="budget-dept-item">
                    <div className="budget-dept-info">
                      <div className="budget-dept-names">
                        <span className="budget-dept-title">{dept.name}</span>
                        <span className="budget-dept-code">{dept.id}</span>
                      </div>
                      <div className="budget-dept-nums">
                        <span>Alloc: ₹{dept.alloc} Cr</span>
                        <span className="budget-bold">Act: ₹{dept.act} Cr</span>
                        <span className={`budget-bold ${dept.risk === 'High Risk' ? 'alert-color' : ''}`}>
                          Fcst: ₹{dept.fcst} Cr ({dept.variance})
                        </span>
                      </div>
                    </div>
                    <div className="budget-comparator-bar-track">
                      <div className="target-marker" style={{ left: `${(dept.alloc / 12) * 100}%` }} title={`Budget Target: ₹${dept.alloc} Cr`}></div>
                      <div className="forecast-bar" style={{ width: `${(dept.fcst / 12) * 100}%` }}></div>
                      <div className="actual-bar" style={{ width: `${(dept.act / 12) * 100}%` }}></div>
                    </div>
                    <div className="budget-dept-footer-note">
                      <span className={dept.risk === 'High Risk' ? 'alert-color' : ''}>
                        {dept.risk === 'High Risk' ? '⚠️ High Risk: Critical Overrun projected' : `Status: ${dept.risk} (${dept.consumed}% consumed)`}
                      </span>
                      <span>{dept.consumed}% consumed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="budget-section-card">
              <div className="budget-section-header">
                <div>
                  <h3 className="budget-section-title">Monthly Spending Pacing &amp; AI Trajectory</h3>
                  <p className="budget-section-subtitle">Q4 cumulative run-rate showing actual vs AI predictive envelope</p>
                </div>
                <div className="budget-legend">
                  <span className="legend-item"><span className="line-cyan"></span> Planned Pacing</span>
                  <span className="legend-item"><span className="line-green"></span> Actual Spend</span>
                  <span className="legend-item"><span className="line-dash-amber"></span> AI Forecast (±3.2%)</span>
                </div>
              </div>

              <div className="budget-chart-container">
                <div className="budget-chart-mock-visual">
                  <div className="chart-grid-line"><span>₹30Cr</span></div>
                  <div className="chart-grid-line"><span>₹22Cr</span></div>
                  <div className="chart-grid-line"><span>₹15Cr</span></div>
                  <div className="chart-grid-line"><span>₹7Cr</span></div>
                  <div className="chart-grid-line"><span>₹0</span></div>
                  
                  <div className="chart-today-badge">TODAY (31 DEC)</div>
                  <div className="chart-breach-callout"><span>BREACH: +₹1.82 Cr</span></div>

                  <div className="chart-xaxis-labels">
                    <span>Oct (Act)</span>
                    <span>Nov (Act)</span>
                    <span>Dec (Act)</span>
                    <span className="forecast-label">Jan (Fcst)</span>
                    <span className="forecast-label">Feb (Fcst)</span>
                    <span className="forecast-label">Mar (Fcst)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="budget-right-column">
            
            <div className="budget-section-card risk-panel">
              <div className="budget-section-header">
                <div className="budget-flex-align">
                  <span className="budget-icon-cyan">🛡️</span>
                  <h3 className="budget-section-title">AI Budget Risk</h3>
                </div>
                <span className="budget-tag cyan-pulse">● ACTIVE</span>
              </div>

              <div className="budget-risk-meter-box">
                <div className="budget-radial-progress">
                  <svg className="budget-svg-circle" viewBox="0 0 36 36">
                    <path className="circle-bg" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle-value alert-stroke" strokeDasharray="84, 100" strokeWidth="3.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="budget-radial-text">
                    <span className="budget-radial-num alert-color">84%</span>
                    <span className="budget-radial-label">INDEX</span>
                  </div>
                </div>
                <div>
                  <h4 className="budget-risk-alert-title">Critical Volatility Alert</h4>
                  <p className="budget-section-subtitle">Technology and Cloud scaling rates exceed quarterly baseline by 18.4%. Immediate mitigation advised.</p>
                </div>
              </div>

              <div className="budget-mitigation-actions">
                <div className="budget-mitigation-item">
                  <div className="budget-mitigation-info">
                    <span className="alert-color">⚠️</span>
                    <div>
                      <div className="budget-mitigation-name">Cloud Infrastructure Overrun</div>
                      <div className="budget-mitigation-sub">Projected +₹1.82 Cr breach by March 15</div>
                    </div>
                  </div>
                  <button className="budget-mitigate-btn" onClick={() => handleMitigateClick('Cloud Infrastructure Overrun')}>
                    Mitigate
                  </button>
                </div>

                <div className="budget-mitigation-item">
                  <div className="budget-mitigation-info">
                    <span className="cyan-color">💡</span>
                    <div>
                      <div className="budget-mitigation-name">Marketing Surplus Optimization</div>
                      <div className="budget-mitigation-sub">₹1.1 Cr unallocated capital identified</div>
                    </div>
                  </div>
                  <button className="budget-mitigate-btn" onClick={() => handleMitigateClick('Marketing Surplus Optimization')}>
                    Reallocate
                  </button>
                </div>
              </div>
            </div>

          </div>

        </section>
      </main>

      {/* Interactive Mitigation Modal */}
      {mitigationModalOpen && (
        <div className="budget-modal-backdrop">
          <div className="budget-modal-card">
            <h3>AI Mitigation Assistant</h3>
            <p>Would you like to execute automated budget reallocation for <strong>{selectedMitigationItem}</strong>?</p>
            <div className="budget-modal-actions">
              <button className="budget-btn-secondary" onClick={() => setMitigationModalOpen(false)}>Cancel</button>
              <button className="budget-btn-primary" onClick={confirmMitigation}>Confirm Reallocation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}