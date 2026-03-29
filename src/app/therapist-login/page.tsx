"use client";
import { useState } from "react";
import Link from "next/link";

const DEMO_EMAIL = "therapist@demo.com";
const DEMO_PASSWORD = "demo123";

function mockJwt(payload: object) {
  const h = btoa(JSON.stringify({ alg: "none" }));
  const p = btoa(JSON.stringify(payload));
  return `${h}.${p}.mock`;
}

export default function TherapistLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo credentials — bypass backend
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("therapist_token", mockJwt({ sub: "Dr. Demo Therapist", email: DEMO_EMAIL }));
      window.location.href = "/therapist";
      return;
    }

    try {
      const res = await (await import("@/services/authService")).authService.therapistLogin(email, password);
      const data = res.data;
      localStorage.setItem("therapist_token", data.token);
      window.location.href = "/therapist";
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Login failed. Your account may be inactive or suspended.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EEF2F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="#10B981"/>
              <path d="M18 27s-9-5.5-9-12a6 6 0 0 1 9-5.196A6 6 0 0 1 27 15c0 6.5-9 12-9 12z" fill="white" opacity="0.9"/>
              <path d="M13 18.5 l2.5 2.5 l5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-gray-900 tracking-tight">WellConnect</span>
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

          {/* Demo credentials hint */}
          <div className="mt-5 p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl">
            <p className="text-xs font-bold text-[#065F46] mb-1.5">Demo credentials</p>
            <p className="text-xs text-[#065F46]">Email: <span className="font-mono font-semibold">{DEMO_EMAIL}</span></p>
            <p className="text-xs text-[#065F46]">Password: <span className="font-mono font-semibold">{DEMO_PASSWORD}</span></p>
          </div>
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
