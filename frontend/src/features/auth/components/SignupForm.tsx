import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../authApi";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [signup, { isLoading, error, isSuccess }] = useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/app", { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup({ name, email, password }).unwrap();
    } catch {
      // handled by RTK Query error object
    }
  };

  const errorMessage =
    (error as { data?: { message?: string } } | undefined)?.data?.message ??
    "Signup failed";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Sign Up</h2>
      <div className="space-y-1">
        <label className="text-sm">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
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
        {isLoading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-medium underline">
          Login
        </Link>
      </p>
    </form>
  );
}
