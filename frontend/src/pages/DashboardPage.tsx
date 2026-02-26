import { useAppSelector } from "../hooks/hooks";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <section className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <p className="mt-2 text-gray-700">Welcome back, {user?.name}.</p>
      <p className="mt-1 text-sm text-gray-600">Role: {user?.role}</p>
    </section>
  );
}
