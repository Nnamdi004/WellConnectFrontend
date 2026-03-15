"use client";
import Link from "next/link";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081") + "/oauth2/authorization/google";
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WellConnect</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue your healing journey</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">For Community Members</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
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
    </main>
  );
}
