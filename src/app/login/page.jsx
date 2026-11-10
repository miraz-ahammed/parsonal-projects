"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    const newErrors = {};
    if (!EMAIL_REGEX.test(email)) newErrors.email = "Enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        // email বা password ভুল হলে একই message দেখাই
        const msg = "Incorrect email or password.";
        setErrors({ password: msg });
        toast.error(msg);
        return;
      }

      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">
          Login to manage your campaigns and contributions.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              className={inputClass}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">or</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          onClick={handleGoogle}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            href="/register"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}