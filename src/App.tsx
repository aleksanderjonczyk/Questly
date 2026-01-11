/// IMPORTS
import { BrowserRouter, Route, Routes } from "react-router-dom";
// IMPORT PAGES
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
// IMPORT COMPONENTS
import Today from "./components/Today";
import QuestsList from "./components/QuestsList";
import History from "./components/History";
import Retired from "./components/Retired";
import Settings from "./components/Settings";
import Stats from "./components/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="today-list" element={<Today />} />
          <Route path="quests-list" element={<QuestsList />} />
          <Route path="history" element={<History />} />
          <Route path="retired" element={<Retired />} />
          <Route path="settings" element={<Settings />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
