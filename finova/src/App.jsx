import "./App.css";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./layout/Sidebar.jsx";
import Header from "./layout/Header.jsx";

import DashboardPage from "./pages/DashboardPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import AnomaliesPage from "./pages/AnomaliesPage.jsx";
import ForecastPage from "./pages/ForecastPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import VendorsPage from "./pages/VendorsPage.jsx";
import AssistantPage from "./pages/AssistantPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Header />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/anomalies" element={<AnomaliesPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;