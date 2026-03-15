"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getTokenType(): "user" | "therapist" | "admin" | null {
  if (typeof window === "undefined") return null;
  if (localStorage.getItem("admin_token")) return "admin";
  if (localStorage.getItem("therapist_token")) return "therapist";
  if (localStorage.getItem("token")) return "user";
  return null;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [tokenType, setTokenType] = useState<"user" | "therapist" | "admin" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTokenType(getTokenType());
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("therapist_token");
    localStorage.removeItem("admin_token");
    router.push("/");
  };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/")
      ? "text-[#10B981] font-semibold"
      : "text-gray-600 hover:text-[#10B981]";

  // Skeleton while mounting to avoid hydration flash
  if (!mounted) {
    return (
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-lg">W</span>
          </div>
          <span className="text-xl font-bold text-gray-900">WellConnect</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">

      {/* ── LOGO ── */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center">
          <span className="text-white font-black text-lg">W</span>
        </div>
        <span className="text-xl font-bold text-gray-900">WellConnect</span>
        {tokenType === "therapist" && (
          <span className="ml-1 px-2 py-0.5 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold rounded-full">
            Therapist
          </span>
        )}
        {tokenType === "admin" && (
          <span className="ml-1 px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded-full">
            Admin
          </span>
        )}
      </Link>

      {/* ── NAV LINKS ── */}
      <div className="flex items-center gap-7">

        {/* VISITOR — not logged in */}
        {tokenType === null && (
          <>
            <a href="/#about" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              About
            </a>
            <Link href="/feed" className={`text-sm font-medium transition-colors ${isActive("/feed")}`}>
              Community
            </Link>
            <a href="/#contact" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              Emergency
            </a>
            <Link href="/help" className={`text-sm font-medium transition-colors ${isActive("/help")}`}>
              Help
            </Link>
          </>
        )}

        {/* LOGGED IN USER */}
        {tokenType === "user" && (
          <>
            <Link href="/feed" className={`text-sm font-medium transition-colors ${isActive("/feed")}`}>
              Forum
            </Link>
            <Link href="/dashboard" className={`text-sm font-medium transition-colors ${isActive("/dashboard")}`}>
              Dashboard
            </Link>
            <Link href="/messages" className={`text-sm font-medium transition-colors ${isActive("/messages")}`}>
              Chat
            </Link>
            <Link href="/intake" className={`text-sm font-medium transition-colors ${isActive("/intake")}`}>
              Assessment
            </Link>
          </>
        )}

        {/* LOGGED IN THERAPIST */}
        {tokenType === "therapist" && (
          <>
            <Link href="/therapist" className={`text-sm font-medium transition-colors ${isActive("/therapist")}`}>
              Appointments
            </Link>
            <Link href="/therapist#clients" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              My Clients
            </Link>
            <Link href="/messages" className={`text-sm font-medium transition-colors ${isActive("/messages")}`}>
              Chat
            </Link>
          </>
        )}

        {/* LOGGED IN ADMIN */}
        {tokenType === "admin" && (
          <>
            <Link href="/admin" className={`text-sm font-medium transition-colors ${isActive("/admin")}`}>
              Overview
            </Link>
            <Link href="/admin#therapists" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              Therapists
            </Link>
            <Link href="/admin#moderation" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              Moderation
            </Link>
            <Link href="/admin#taxonomy" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              Taxonomy
            </Link>
          </>
        )}
      </div>

      {/* ── RIGHT SIDE BUTTON ── */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* VISITOR */}
        {tokenType === null && (
          <>
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="px-5 py-2.5 bg-[#10B981] text-white text-sm font-semibold rounded-full hover:bg-[#059669] active:scale-95 transition-all">
              Get Started
            </Link>
          </>
        )}

        {/* LOGGED IN USER */}
        {tokenType === "user" && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ECFDF5] rounded-full flex items-center justify-center">
              <svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* LOGGED IN THERAPIST */}
        {tokenType === "therapist" && (
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 border-2 border-[#10B981] text-[#10B981] text-sm font-semibold rounded-full hover:bg-[#ECFDF5] active:scale-95 transition-all"
          >
            Sign Out
          </button>
        )}

        {/* LOGGED IN ADMIN */}
        {tokenType === "admin" && (
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 active:scale-95 transition-all"
          >
            Sign Out
          </button>
        )}
      </div>

    </nav>
  );
}
