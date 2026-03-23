"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MessageCircle,
  ClipboardList,
  Users,
  Calendar,
  ShieldCheck,
  Layers,
  LogOut,
  UserCircle,
  BookOpen,
  HelpCircle,
  PhoneCall,
} from "lucide-react";

function WellConnectLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#10B981"/>
      <path
        d="M18 27s-9-5.5-9-12a6 6 0 0 1 9-5.196A6 6 0 0 1 27 15c0 6.5-9 12-9 12z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M13 18.5 l2.5 2.5 l5-6"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

  if (!mounted) {
    return (
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <WellConnectLogo />
          <span className="text-xl font-bold text-gray-900 tracking-tight">WellConnect</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/95 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
        <WellConnectLogo />
        <span className="text-xl font-bold text-gray-900 tracking-tight">WellConnect</span>
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

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">

        {tokenType === null && (
          <>
            <a href="/#about" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              About
            </a>
            <Link href="/feed" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/feed")}`}>
              <Users size={15} />
              Community
            </Link>
            <a href="/#contact" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              <PhoneCall size={15} />
              Emergency
            </a>
            <Link href="/help" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/help")}`}>
              <HelpCircle size={15} />
              Help
            </Link>
          </>
        )}

        {tokenType === "user" && (
          <>
            <Link href="/feed" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/feed")}`}>
              <BookOpen size={15} />
              Forum
            </Link>
            <Link href="/dashboard" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/dashboard")}`}>
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <Link href="/messages" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/messages")}`}>
              <MessageCircle size={15} />
              Chat
            </Link>
            <Link href="/intake" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/intake")}`}>
              <ClipboardList size={15} />
              Assessment
            </Link>
          </>
        )}

        {tokenType === "therapist" && (
          <>
            <Link href="/therapist" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/therapist")}`}>
              <Calendar size={15} />
              Appointments
            </Link>
            <Link href="/therapist#clients" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              <Users size={15} />
              My Clients
            </Link>
            <Link href="/messages" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/messages")}`}>
              <MessageCircle size={15} />
              Chat
            </Link>
          </>
        )}

        {tokenType === "admin" && (
          <>
            <Link href="/admin" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/admin")}`}>
              <LayoutDashboard size={15} />
              Overview
            </Link>
            <Link href="/admin#therapists" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              <ShieldCheck size={15} />
              Therapists
            </Link>
            <Link href="/admin#moderation" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              <ClipboardList size={15} />
              Moderation
            </Link>
            <Link href="/admin#taxonomy" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              <Layers size={15} />
              Taxonomy
            </Link>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {tokenType === null && (
          <>
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-[#10B981] transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="px-5 py-2.5 bg-[#10B981] text-white text-sm font-semibold rounded-full hover:bg-[#059669] active:scale-95 transition-all shadow-sm shadow-emerald-200">
              Get Started
            </Link>
          </>
        )}

        {tokenType === "user" && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ECFDF5] rounded-full flex items-center justify-center">
              <UserCircle size={18} className="text-[#10B981]" />
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        )}

        {tokenType === "therapist" && (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-5 py-2.5 border-2 border-[#10B981] text-[#10B981] text-sm font-semibold rounded-full hover:bg-[#ECFDF5] active:scale-95 transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        )}

        {tokenType === "admin" && (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 active:scale-95 transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        )}
      </div>

    </nav>
  );
}
