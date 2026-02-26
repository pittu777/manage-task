import { Link } from "react-router-dom";
import { PATHS } from "../app/paths";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <section className="w-full rounded-xl border p-6 text-center">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to={PATHS.login}
          className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-white"
        >
          Go to login
        </Link>
      </section>
    </main>
  );
}
