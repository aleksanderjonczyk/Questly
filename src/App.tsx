/// IMPORTS
import { BrowserRouter, Route, Routes } from "react-router-dom";
// IMPORT PAGES
import HomePage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import TodayPage from "./pages/TodayPage";
import QuestsPage from "./pages/QuestsPage";
import CompletionsPage from "./pages/CompletionsPage";
import SettingsPage from "./pages/SettingsPage";
import StatsPage from "./pages/StatsPage";
import { QuestsProvider } from "./features/quests/QuestContext";
import UpcomingQuests from "./features/quests/components/UpcomingQuests";

function App() {
  return (
    <QuestsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="today-list" element={<TodayPage />} />
            <Route path="quests-list" element={<QuestsPage />} />
            <Route path="upcoming" element={<UpcomingQuests />} />
            <Route path="completions" element={<CompletionsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QuestsProvider>
  );
}

export default App;
