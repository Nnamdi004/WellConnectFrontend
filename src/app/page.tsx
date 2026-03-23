"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Activity,
  Users,
  BarChart2,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Heart,
  Sparkles,
} from "lucide-react";

function PhoneMockup() {
  return (
    <div className="relative flex justify-center md:justify-end">
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-[#10B981] opacity-10 blur-3xl rounded-full scale-75 translate-y-8"></div>

      {/* Phone frame */}
      <div className="relative w-64 bg-gradient-to-b from-[#e6fdf4] to-[#ccfbe8] rounded-[2.5rem] p-2.5 shadow-2xl border border-[#a7f3d0] z-10">
        <div className="bg-white rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="bg-[#0D5C3D] px-4 py-3 flex items-center justify-between">
            <span className="text-white text-xs font-bold tracking-wide">WellConnect</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-[#6EE7B7] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#6EE7B7] rounded-full"></div>
              <div className="w-1 h-1 bg-[#34d399] rounded-full opacity-60"></div>
            </div>
          </div>

          {/* App body */}
          <div className="bg-gray-50 px-3 py-3 space-y-2.5 min-h-[340px]">
            {/* Greeting */}
            <div className="pt-1">
              <p className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">Good morning</p>
              <p className="text-gray-900 text-sm font-bold leading-tight">How are you today?</p>
            </div>

            {/* Mood card */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Mood Today</span>
                <span className="text-base">😊</span>
              </div>
              {/* Bar chart */}
              <div className="flex items-end gap-[3px] h-10">
                {[40, 60, 50, 80, 70, 90, 80].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all ${i === 6 ? "bg-[#10B981]" : "bg-[#d1fae5]"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="text-[9px] text-gray-300 flex-1 text-center font-medium">{d}</span>
                ))}
              </div>
            </div>

            {/* Session card */}
            <div className="bg-[#0D5C3D] rounded-2xl p-3">
              <p className="text-[#6EE7B7] text-[10px] font-bold uppercase tracking-widest mb-1">Next Session</p>
              <p className="text-white text-sm font-bold">Dr. Amara Nkosi</p>
              <p className="text-[#A7F3D0] text-[11px]">Tomorrow · 10:00 AM</p>
            </div>

            {/* Community pulse */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Community</p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["#F87171", "#60A5FA", "#FBBF24", "#A78BFA"].map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-medium">14 shared today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div className="absolute top-2 -right-6 bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-100 flex items-center gap-2 z-20">
        <div className="w-6 h-6 bg-[#ECFDF5] rounded-full flex items-center justify-center">
          <CheckCircle2 size={13} className="text-[#10B981]" />
        </div>
        <span className="text-xs font-bold text-gray-700">Therapist Matched!</span>
      </div>

      {/* Floating badge — bottom left */}
      <div className="absolute -bottom-2 -left-10 bg-white rounded-2xl px-3 py-2.5 shadow-lg border border-gray-100 z-20">
        <p className="text-[10px] text-gray-400 font-medium">Mood streak</p>
        <div className="flex items-center gap-1">
          <TrendingUp size={13} className="text-[#10B981]" />
          <p className="text-sm font-extrabold text-[#10B981]">7-day streak</p>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Activity size={24} className="text-[#10B981]" />,
    title: "Therapist Matching",
    desc: "Get matched with a verified therapist based on your intake assessment. All professionals are vetted by our team.",
    link: "/how-it-works",
    cta: "See how it works",
  },
  {
    icon: <Users size={24} className="text-[#10B981]" />,
    title: "Peer Support",
    desc: "Read and share stories anonymously. Give and receive support from a community that truly understands.",
    link: "/feed",
    cta: "Browse stories",
  },
  {
    icon: <BarChart2 size={24} className="text-[#10B981]" />,
    title: "Mood Tracking",
    desc: "Log your mood daily and watch your progress on a chart. Share your history with your therapist.",
    link: "/mood-tracking",
    cta: "See how it works",
  },
  {
    icon: <MessageCircle size={24} className="text-[#10B981]" />,
    title: "Secure Chat",
    desc: "Message your therapist through our encrypted in-app chat. All sessions are private and confidential.",
    link: "/register",
    cta: "Get started",
  },
];

function AboutIllustration() {
  return (
    <div className="relative w-full">
      {/* Main card */}
      <div className="relative bg-gradient-to-br from-[#ECFDF5] to-[#d1fae5] rounded-3xl p-8 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#10B981] opacity-10"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#059669] opacity-10"></div>

        {/* People icons row */}
        <div className="flex justify-center gap-5 mb-6">
          {[
            { bg: "#F87171", delay: "0ms" },
            { bg: "#60A5FA", delay: "100ms" },
            { bg: "#FBBF24", delay: "200ms" },
            { bg: "#A78BFA", delay: "300ms" },
            { bg: "#34D399", delay: "400ms" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full border-3 border-white shadow-md flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
            </div>
          ))}
        </div>

        {/* Connection lines SVG */}
        <svg viewBox="0 0 320 40" className="w-full mb-6 opacity-30" fill="none">
          <path d="M32 0 Q160 40 288 0" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4"/>
          <path d="M80 0 Q160 30 240 0" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3"/>
        </svg>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "2K+", label: "Members", icon: <Users size={16} className="text-[#10B981]" /> },
            { value: "98%", label: "Feel Supported", icon: <Heart size={16} className="text-[#10B981]" /> },
            { value: "50+", label: "Therapists", icon: <Sparkles size={16} className="text-[#10B981]" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <p className="text-lg font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-[11px] text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative floating dot */}
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#ECFDF5] rounded-full -z-10 border-4 border-white"></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 max-w-7xl mx-auto gap-10">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold rounded-full mb-6">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
            Now available in Rwanda
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
            Mental Health<br />Support,<br />
            <span className="text-[#10B981]">Reimagined.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            WellConnect bridges the gap between you and professional care. From peer support to licensed therapists, we are here for your journey.
          </p>
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/register"
              className="px-7 py-3.5 bg-[#10B981] text-white font-semibold rounded-full hover:bg-[#059669] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <a
              href="#about"
              className="px-7 py-3.5 border-2 border-gray-200 text-gray-800 font-semibold rounded-full hover:border-[#10B981] hover:text-[#10B981] active:scale-95 transition-all"
            >
              Learn More
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#F87171", "#60A5FA", "#FBBF24", "#A78BFA"].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <span className="text-gray-500 text-sm font-medium">Join 2,000+ users today</span>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end pr-8">
          <PhoneMockup />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#10B981] text-sm font-bold uppercase tracking-widest mb-3">OUR ECOSYSTEM</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Comprehensive Care for Your Mind</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We have built a holistic platform that adapts to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col border border-gray-50">
                <div className="w-14 h-14 bg-[#ECFDF5] rounded-2xl flex items-center justify-center mb-5 flex-shrink-0">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{f.desc}</p>
                <Link
                  href={f.link}
                  className="mt-4 text-sm font-semibold text-[#10B981] hover:underline inline-flex items-center gap-1"
                >
                  {f.cta}
                  <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-14">
          <div className="flex-1">
            <AboutIllustration />
          </div>
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold rounded-full mb-4">
              Our Mission
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
              Breaking Barriers to Mental Healthcare in Rwanda
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Mental health support should be accessible to everyone. In Rwanda, we face a shortage of professionals and a lingering stigma that prevents many from seeking help.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              WellConnect is more than an app. It is a movement. By combining technology with human connection, we are democratizing access to care.
            </p>
            <div className="space-y-3">
              {["Culturally relevant therapy matching", "Anonymous and safe peer environments", "Data-driven insights for better treatment"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#10B981]">
                    <CheckCircle2 size={12} className="text-[#10B981]" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="bg-[#0D5C3D] py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-14">
          <div className="flex-1 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-[#6EE7B7] text-xs font-semibold rounded-full mb-5">
              <Sparkles size={12} />
              Dashboard Preview
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Your Personal Mental Health Dashboard
            </h2>
            <p className="text-[#6EE7B7] leading-relaxed mb-8">
              Log your mood daily, visualize your progress on a chart, book sessions with your therapist, and access peer support — all in one place.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0D5C3D] font-bold rounded-full hover:bg-gray-100 active:scale-95 transition-all"
            >
              Create Free Account
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-[#1a1a2e] rounded-2xl p-4 w-full max-w-md shadow-2xl border border-white/5">
              <div className="flex gap-1.5 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              {/* Mock chart */}
              <div className="bg-[#0f0f1a] rounded-xl p-4 h-36 mb-3 flex items-end gap-2 px-5">
                {[5, 7, 4, 8, 6, 9, 8].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md ${i === 5 ? "bg-[#10B981]" : "bg-[#10B981]/30"}`}
                    style={{ height: `${h * 10}%` }}
                  />
                ))}
              </div>
              <div className="bg-[#1e3a5f] rounded-xl px-4 py-3 flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle size={14} className="text-white" />
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Hello. I noticed your mood has been low today. Would you like to try a breathing exercise?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="community" className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-3xl px-10 py-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-white opacity-10 -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-white opacity-10 translate-x-16 translate-y-16"></div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full mb-5 relative z-10">
              <Heart size={12} />
              Join Our Community
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4 relative z-10 tracking-tight">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-[#ECFDF5] text-lg mb-8 relative z-10">
              Join a community that cares. Professional help and peer support are just a click away.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#10B981] font-bold rounded-full hover:bg-gray-50 active:scale-95 transition-all relative z-10 text-lg shadow-xl"
            >
              Create Free Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-white border-t border-gray-100 py-14 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="10" fill="#10B981"/>
                <path d="M18 27s-9-5.5-9-12a6 6 0 0 1 9-5.196A6 6 0 0 1 27 15c0 6.5-9 12-9 12z" fill="white" opacity="0.9"/>
                <path d="M13 18.5 l2.5 2.5 l5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold text-gray-900 tracking-tight">WellConnect</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering mental wellness through technology and community connection in Rwanda.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/feed" className="hover:text-[#10B981] transition-colors">Community Forum</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#10B981] transition-colors">Mood Dashboard</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#10B981] transition-colors">Therapist Matching</Link></li>
              <li><Link href="/intake" className="hover:text-[#10B981] transition-colors">Mental Health Assessment</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">About Us</a></li>
              <li><Link href="/therapist-login" className="hover:text-[#10B981] transition-colors">Therapist Portal</Link></li>
              <li><Link href="/admin-login" className="hover:text-[#10B981] transition-colors">Admin Portal</Link></li>
              <li><a href="#" className="hover:text-[#10B981] transition-colors">Privacy Policy</a></li>
              <li><Link href="/help" className="hover:text-[#10B981] transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Emergency Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Rwanda Crisis Line: 3026
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Mental Health: +250 788 386 909
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                support@wellconnect.rw
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-100 mt-10 pt-6 text-center text-sm text-gray-400">
          2026 WellConnect. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
