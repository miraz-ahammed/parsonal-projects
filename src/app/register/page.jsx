"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// অন্তত ১টা বড় হাতের, ১টা ছোট হাতের অক্ষর আর ৬ অক্ষর
function validatePassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must include a lowercase letter.";
  return "";
}

async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.data.display_url;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const role = form.role.value;
    const photo = form.photo.files[0];

    // Validation
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!EMAIL_REGEX.test(email)) newErrors.email = "Enter a valid email.";
    const passError = validatePassword(password);
    if (passError) newErrors.password = passError;
    if (!photo) newErrors.photo = "Please choose a profile picture.";
    if (!role) newErrors.role = "Select a role.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const imageUrl = await uploadToImgBB(photo);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: imageUrl,
        role,
      });

      if (error) {
        const msg = /exist/i.test(error.message || "")
          ? "This email is already registered."
          : error.message || "Registration failed.";
        setErrors({ email: msg });
        toast.error(msg);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-600">
          Supporters start with 50 credits and Creators start with 20.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

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
              Profile picture
            </label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-emerald-700"
            />
            {errors.photo && (
              <p className="mt-1 text-xs text-red-600">{errors.photo}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              className={inputClass}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              I want to join as
            </label>
            <select name="role" defaultValue="supporter" className={inputClass}>
              <option value="supporter">Supporter</option>
              <option value="creator">Creator</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-xs text-red-600">{errors.role}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}