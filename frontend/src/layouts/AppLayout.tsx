import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../features/auth/authSlice";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10">
      <header className="mb-8 flex items-center justify-between rounded-xl border px-5 py-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Logout
        </button>
      </header>

      <Outlet />
    </main>
  );
}
