import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <section className="w-full">
        <h1 className="mb-6 text-center text-3xl font-bold">Manage Users</h1>
        <Outlet />
      </section>
    </main>
  );
}
