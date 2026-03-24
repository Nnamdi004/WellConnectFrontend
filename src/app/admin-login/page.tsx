"use client";
import { useState } from "react";
import Link from "next/link";

const DEMO_EMAIL = "admin@wellconnect.com";
const DEMO_PASSWORD = "admin123";

function mockJwt(payload: object) {
  const h = btoa(JSON.stringify({ alg: "none" }));
  const p = btoa(JSON.stringify(payload));
  return `${h}.${p}.mock`;
}

export default function AdminLoginPage() {
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
      localStorage.setItem("admin_token", mockJwt({ sub: "admin", email: DEMO_EMAIL }));
      window.location.href = "/admin";
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"}/api/auth/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Invalid credentials.");
      }
      const data = await res.json();
      localStorage.setItem("admin_token", data.token);
      window.location.href = "/admin";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl">W</span>
            </div>
            <span className="text-2xl font-bold text-white">WellConnect</span>
          </div>
          <p className="text-gray-400 text-sm">Administrator Access</p>
        </div>
        <div className="bg-gray-800 rounded-3xl border border-gray-700 p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
              Admin Portal
            </span>
            <h1 className="text-2xl font-bold text-white">Sign In</h1>
            <p className="text-gray-400 text-sm mt-1">
              Restricted access. Authorised personnel only.
            </p>
          </div>
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@wellconnect.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#10B981]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#10B981]"
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
          <div className="mt-5 p-4 bg-gray-700/50 rounded-xl">
            <p className="text-xs text-gray-400 font-bold mb-1.5">Demo credentials</p>
            <p className="text-xs text-gray-300">Email: <span className="font-mono font-semibold text-white">{DEMO_EMAIL}</span></p>
            <p className="text-xs text-gray-300">Password: <span className="font-mono font-semibold text-white">{DEMO_PASSWORD}</span></p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
