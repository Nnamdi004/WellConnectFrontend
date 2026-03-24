"use client";
import Link from "next/link";
import { Heart, Shield, Users, TrendingUp } from "lucide-react";

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

// Creates a minimal mock JWT so token-parsing code (e.g. settings page) works offline
function mockJwt(payload: object) {
  const h = btoa(JSON.stringify({ alg: "none" }));
  const p = btoa(JSON.stringify(payload));
  return `${h}.${p}.mock`;
}

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081") + "/oauth2/authorization/google";
  };

  const handleDemoLogin = () => {
    localStorage.setItem("token", mockJwt({ sub: "demo_user", email: "user@demo.wellconnect.rw" }));
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen flex">
      {/* Left panel — decorative */}
      <div className="hidden md:flex flex-col justify-between w-2/5 bg-gradient-to-br from-[#0D5C3D] via-[#065F46] to-[#047857] p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-5 -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-5 translate-y-16 -translate-x-16"></div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <WellConnectLogo />
          <span className="text-xl font-bold text-white tracking-tight">WellConnect</span>
        </Link>

        {/* Main message */}
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

        {/* Testimonial */}
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

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
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
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">For Community Members</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all mb-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Demo login — remove once backend is live */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div>
            </div>
            <button
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-[#065F46] font-semibold hover:bg-[#d1fae5] active:scale-95 transition-all text-sm"
            >
              <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
              Demo — Sign in as User
            </button>
            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              By signing in you agree to keep this space safe and respectful for everyone.
            </p>
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

          <div className="text-center">
            <Link href="/admin-login" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Administrator access
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
