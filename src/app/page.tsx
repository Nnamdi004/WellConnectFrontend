"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 max-w-7xl mx-auto gap-10">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold rounded-full mb-6">
            <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
            Now available in Rwanda
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Mental Health<br />Support,<br />
            <span className="text-[#10B981]">Reimagined.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            WellConnect bridges the gap between you and professional care. From peer support to licensed therapists, we are here for your journey.
          </p>
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/register"
              className="px-7 py-3.5 bg-[#10B981] text-white font-semibold rounded-full hover:bg-[#059669] active:scale-95 transition-all flex items-center gap-2"
            >
              Get Started Free
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
              {["#F87171","#60A5FA","#FBBF24","#A78BFA"].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <span className="text-gray-500 text-sm">Join 2,000+ users today</span>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#6EE7B7] to-[#059669]">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white opacity-10 -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-20 left-0 w-32 h-32 rounded-full bg-white opacity-10 translate-y-10 -translate-x-10"></div>
            <div className="absolute inset-0 flex items-center justify-center pb-16">
              <div className="text-center text-white opacity-40">
                <svg width="72" height="72" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-5 left-4 right-4 bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <div className="w-9 h-9 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">DAILY MOOD</p>
                <p className="text-sm font-bold text-gray-900">Feeling hopeful today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#10B981] text-sm font-bold uppercase tracking-widest mb-3">OUR ECOSYSTEM</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Comprehensive Care for Your Mind</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We have built a holistic platform that adapts to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <svg width="26" height="26" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: "Therapist Matching",
                desc: "Get matched with a verified therapist based on your intake assessment. All professionals are vetted by our team.",
                link: "/how-it-works",
                cta: "See how it works",
              },
              {
                icon: <svg width="26" height="26" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: "Peer Support",
                desc: "Read and share stories anonymously. Give and receive support from a community that truly understands.",
                link: "/feed",
                cta: "Browse stories",
              },
              {
                icon: <svg width="26" height="26" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: "Mood Tracking",
                desc: "Log your mood daily and watch your progress on a chart. Share your history with your therapist.",
                link: "/mood-tracking",
cta: "See how it works",
              },
              {
                icon: <svg width="26" height="26" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: "Secure Chat",
                desc: "Message your therapist through our encrypted in-app chat. All sessions are private and confidential.",
                link: "/register",
                cta: "Get started",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col">
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
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-14">
          <div className="flex-1 relative">
            <div className="w-full h-80 bg-gray-100 rounded-3xl flex items-center justify-center">
              <div className="text-center text-gray-300">
                <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto mb-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-sm">Community photo</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#ECFDF5] rounded-full -z-10"></div>
          </div>
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold rounded-full mb-4">
              Our Mission
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Breaking Barriers to Mental Healthcare in Rwanda
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Mental health support should be accessible to everyone. In Rwanda, we face a shortage of professionals and a lingering stigma that prevents many from seeking help.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              WellConnect is more than an app. It is a movement. By combining technology with human connection, we are democratizing access to care.
            </p>
            <div className="space-y-3">
              {["Culturally relevant therapy matching","Anonymous and safe peer environments","Data-driven insights for better treatment"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#10B981]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
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
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Your Personal Mental Health Dashboard
            </h2>
            <p className="text-[#6EE7B7] leading-relaxed mb-8">
              Log your mood daily, visualize your progress on a chart, book sessions with your therapist, and access peer support — all in one place.
            </p>
            <Link
              href="/register"
              className="inline-block px-7 py-3.5 bg-white text-[#0D5C3D] font-bold rounded-full hover:bg-gray-100 active:scale-95 transition-all"
            >
              Create Free Account
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-[#1a1a2e] rounded-2xl p-4 w-full max-w-md shadow-2xl">
              <div className="flex gap-1.5 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-[#0f0f1a] rounded-xl p-5 h-36 flex items-center justify-center mb-3">
                <p className="text-gray-600 text-sm text-center">Mood chart visualization</p>
              </div>
              <div className="bg-[#1e3a5f] rounded-xl px-4 py-3 flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
            <h2 className="text-4xl font-extrabold text-white mb-4 relative z-10">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-[#ECFDF5] text-lg mb-8 relative z-10">
              Join a community that cares. Professional help and peer support are just a click away.
            </p>
            <Link
              href="/register"
              className="inline-block px-10 py-4 bg-white text-[#10B981] font-bold rounded-full hover:bg-gray-50 active:scale-95 transition-all relative z-10 text-lg"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-white border-t border-gray-100 py-14 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">WellConnect</span>
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
