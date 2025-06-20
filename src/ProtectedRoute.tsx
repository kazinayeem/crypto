//import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import type { RootState } from "./store";

export function ProtectedRoute() {
  //const user = useSelector((state: RootState) => state.user.users[0]);
  const user = true; // Replace with actual user state from Redux or context
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
}
