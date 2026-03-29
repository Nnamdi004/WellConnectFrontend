"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Shield, Users, TrendingUp } from "lucide-react";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

function WellConnectLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="10" fill="#10B981"/>
      <path d="M18 27s-9-5.5-9-12a6 6 0 0 1 9-5.196A6 6 0 0 1 27 15c0 6.5-9 12-9 12z" fill="white" opacity="0.9"/>
      <path d="M13 18.5 l2.5 2.5 l5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const highlights = [
  { icon: <Heart size={18} className="text-[#6EE7B7]" />, text: "Connect with verified therapists" },
  { icon: <Shield size={18} className="text-[#6EE7B7]" />, text: "Completely private and anonymous" },
  { icon: <Users size={18} className="text-[#6EE7B7]" />, text: "Join a supportive community" },
  { icon: <TrendingUp size={18} className="text-[#6EE7B7]" />, text: "Track your mental wellness journey" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      const data = res.data;
      login(
        { id: data.id ?? 0, email, name: data.username ?? email, role: data.role ?? "PATIENT" },
        data.token
      );
      if (data.role === "ADMIN") router.push("/admin");
      else if (data.role === "THERAPIST") router.push("/therapist");
      else router.push("/dashboard");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between w-2/5 bg-gradient-to-br from-[#0D5C3D] via-[#065F46] to-[#047857] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-5 -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-5 translate-y-16 -translate-x-16"></div>

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <WellConnectLogo />
          <span className="text-xl font-bold text-white tracking-tight">WellConnect</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            Your healing journey starts here.
          </h2>
          <p className="text-[#A7F3D0] text-sm leading-relaxed mb-8">
            Thousands of people in Rwanda have found support, connection, and healing through WellConnect.
          </p>
          <div className="space-y-3">
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  {h.icon}
                </div>
                <span className="text-[#ECFDF5] text-sm font-medium">{h.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/10 rounded-2xl p-5 border border-white/10">
          <p className="text-[#ECFDF5] text-sm leading-relaxed italic mb-3">
            &ldquo;WellConnect helped me find a therapist who actually understands my culture. I finally feel seen.&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#F87171] flex items-center justify-center">
              <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#A7F3D0] text-xs font-semibold">Community member, Kigali</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <WellConnectLogo />
              <span className="text-xl font-bold text-gray-900 tracking-tight">WellConnect</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue your healing journey</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] disabled:opacity-60 transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">For Mental Health Professionals</p>
            <Link
              href="/therapist-login"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-[#10B981] text-[#10B981] rounded-xl font-semibold hover:bg-[#ECFDF5] active:scale-95 transition-all text-sm"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign in as a Therapist
            </Link>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#10B981] font-semibold hover:underline">Create one free</Link>
            </p>
            <Link href="/admin-login" className="block text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Administrator access
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
