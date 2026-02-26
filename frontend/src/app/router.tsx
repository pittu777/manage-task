import { Navigate, createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicOnlyRoute from "../routes/PublicOnlyRoute";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <Navigate to={PATHS.login} replace />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: PATHS.login, element: <LoginPage /> },
          { path: PATHS.signup, element: <SignUpPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [{ path: PATHS.app, element: <DashboardPage /> }],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
