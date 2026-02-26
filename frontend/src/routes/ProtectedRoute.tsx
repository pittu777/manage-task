import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { PATHS } from "../app/paths";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
