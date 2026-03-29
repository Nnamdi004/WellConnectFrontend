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

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await authService.register(username, email, password);
      const data = res.data;
      login(
        { id: data.id ?? 0, email, name: data.username ?? username, role: data.role ?? "PATIENT" },
        data.token
      );
      router.push("/dashboard");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Registration failed. Please try again.");
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
            Join thousands on their healing journey.
          </h2>
          <p className="text-[#A7F3D0] text-sm leading-relaxed mb-8">
            Create your free account today and take the first step toward better mental health.
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

        <div className="relative z-10 grid grid-cols-2 gap-3">
          {[
            { value: "2,000+", label: "Active Members" },
            { value: "50+", label: "Verified Therapists" },
            { value: "98%", label: "Feel Supported" },
            { value: "Free", label: "To Get Started" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-2xl p-3 border border-white/10">
              <p className="text-white font-extrabold text-lg leading-none">{stat.value}</p>
              <p className="text-[#A7F3D0] text-xs mt-1">{stat.label}</p>
            </div>
          ))}
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
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">Join thousands of people on their healing journey</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                <input
                  type="text" value={username} onChange={e => setUsername(e.target.value)} required
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50"
                />
              </div>
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
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] disabled:opacity-60 transition-colors"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-4 mt-5">
              <p className="text-xs text-[#065F46] leading-relaxed">
                <strong>Your privacy matters.</strong> You can post stories and comments completely anonymously.
                Your account is only used to secure your login — your name will never be shown publicly unless you choose to.
              </p>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              By creating an account you agree to keep this space safe and respectful for everyone.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Are you a mental health professional?</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Therapist accounts are created by the WellConnect administration team. Please contact us at{" "}
              <a href="mailto:support@wellconnect.rw" className="text-[#10B981] hover:underline">support@wellconnect.rw</a> to apply.
            </p>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#10B981] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
