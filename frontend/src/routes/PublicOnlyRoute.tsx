import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { PATHS } from "../app/paths";

export default function PublicOnlyRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={PATHS.app} replace />;
  }

  return <Outlet />;
}
