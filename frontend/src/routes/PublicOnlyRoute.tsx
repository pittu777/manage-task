import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

export default function PublicOnlyRoute() {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}