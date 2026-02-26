import { Outlet } from "react-router-dom";
import AppNavigation from "../features/AppLayout/components/AppNavigation";

export default function AppLayout() {
  return (
    <div>
      <AppNavigation />
      <Outlet />
    </div>
  );
}
