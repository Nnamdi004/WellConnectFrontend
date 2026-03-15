"use client";
import { useState } from "react";
import Link from "next/link";

export default function TherapistLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"}/api/auth/therapist/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Login failed. Your account may be inactive or suspended.");
      }
      const data = await res.json();
      localStorage.setItem("therapist_token", data.token);
      window.location.href = "/therapist";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EEF2F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center justify-center gap-2 mb-3">
            <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WellConnect</span>
          </Link>
          <p className="text-gray-500 text-sm">Professional Portal</p>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-[#ECFDF5] text-[#10B981] text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
              Therapist Access
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Professional Sign In</h1>
            <p className="text-gray-500 text-sm mt-1">
              Use the credentials provided to you by your administrator.
            </p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] disabled:opacity-60 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-500">
            Not a therapist?{" "}
            <Link href="/login" className="text-[#10B981] font-semibold hover:underline">
              User login
            </Link>
          </p>
          <Link href="/" className="block text-sm text-gray-400 hover:text-gray-600">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
