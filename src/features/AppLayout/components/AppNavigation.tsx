import { NavLink } from "react-router-dom";

export default function AppNavigation() {
  return (
    <div className="app-navigation">
      <NavLink className="app-navigation__link" to="today-list">
        Today
      </NavLink>
      <NavLink className="app-navigation__link" to="completions">
        Completions
      </NavLink>
    </div>
  );
}
