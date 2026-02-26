import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../authApi";

type LocationState = {
  from?: string;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const from = (location.state as LocationState | null)?.from ?? "/app";

  useEffect(() => {
    if (isSuccess) {
      navigate(from, { replace: true });
    }
  }, [from, isSuccess, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
    } catch {
      // handled by RTK Query error object
    }
  };

  const errorMessage =
    (error as { data?: { message?: string } } | undefined)?.data?.message ??
    "Login failed";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Login</h2>
      <div className="space-y-1">
        <label className="text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {isLoading ? "Signing in..." : "Login"}
      </button>

      <p className="text-sm">
        No account?{" "}
        <Link to="/signup" className="font-medium underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
