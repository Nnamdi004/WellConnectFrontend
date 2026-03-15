"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type MoodLog = { id: number; moodLabel: string; moodScore: number; notes: string; loggedAt: string };
type Appointment = { id: number; therapistName: string; scheduledAt: string; status: string };
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardPage() {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sliderValue, setSliderValue] = useState(5);
  const [journalNote, setJournalNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview"|"appointments">("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setIsLoggedIn(!!token);
    if (token) {
      fetch(`${BASE}/api/mood/history`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(setMoodLogs).catch(() => {});
      fetch(`${BASE}/api/appointments`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(setAppointments).catch(() => {});
    }
  }, [BASE]);

  const handleSaveEntry = async () => {
    const token = localStorage.getItem("token") || "";
    if (!token) return;
    setSaving(true);
    const moodLabel = sliderValue <= 3 ? "Low" : sliderValue <= 6 ? "Neutral" : sliderValue <= 8 ? "Good" : "Excellent";
    try {
      await fetch(`${BASE}/api/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ moodLabel, moodScore: sliderValue, notes: journalNote }),
      });
      setSaveSuccess(true);
      setJournalNote("");
      setTimeout(() => setSaveSuccess(false), 3000);
      fetch(`${BASE}/api/mood/history`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(setMoodLogs).catch(() => {});
    } catch {}
    finally { setSaving(false); }
  };

  // Demo data shown to guests so they can see how the dashboard works
  const DEMO_LOGS = [
    { id:1, moodLabel:"Okay", moodScore:5, notes:"First day trying this out", loggedAt: new Date(Date.now()-6*86400000).toISOString() },
    { id:2, moodLabel:"Good", moodScore:7, notes:"Feeling better after a walk", loggedAt: new Date(Date.now()-5*86400000).toISOString() },
    { id:3, moodLabel:"Low", moodScore:3, notes:"Difficult conversation today", loggedAt: new Date(Date.now()-4*86400000).toISOString() },
    { id:4, moodLabel:"Neutral", moodScore:5, notes:"", loggedAt: new Date(Date.now()-3*86400000).toISOString() },
    { id:5, moodLabel:"Good", moodScore:7, notes:"Talked to a friend", loggedAt: new Date(Date.now()-2*86400000).toISOString() },
    { id:6, moodLabel:"Great", moodScore:9, notes:"Great therapy session", loggedAt: new Date(Date.now()-1*86400000).toISOString() },
    { id:7, moodLabel:"Good", moodScore:8, notes:"Feeling hopeful", loggedAt: new Date().toISOString() },
  ];
  const displayLogs = isLoggedIn ? moodLogs : DEMO_LOGS;
  const chartLogs = displayLogs.slice(0, 7).reverse();
  const chartH = 200; const chartW = 580; const pL = 40; const pB = 30; const pT = 20;
  const iW = chartW - pL - 20; const iH = chartH - pB - pT;
  const points = chartLogs.map((log, i) => ({
    x: pL + (i / Math.max(chartLogs.length - 1, 1)) * iW,
    y: pT + iH - (log.moodScore / 10) * iH,
    score: log.moodScore,
    day: new Date(log.loggedAt).toLocaleDateString("en-US", { weekday: "short" }),
  }));
  const polyline = points.map(p => `${p.x},${p.y}`).join(" ");

  const statusColors: Record<string,string> = {
    PENDING:"bg-yellow-100 text-yellow-700",
    CONFIRMED:"bg-green-100 text-green-700",
    COMPLETED:"bg-gray-100 text-gray-500",
    CANCELLED:"bg-red-100 text-red-600",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              {isLoggedIn ? "Welcome back. Here is your wellness summary." : "See what your personal wellness dashboard looks like."}
            </p>
          </div>
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
            {(["overview","appointments"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${activeTab===tab?"bg-[#ECFDF5] text-[#10B981]":"text-gray-500 hover:text-gray-700"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Guest call-to-action banner */}
        {!isLoggedIn && (
          <div className="bg-[#0D5C3D] rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-[#6EE7B7] text-xs font-bold uppercase tracking-widest mb-1">You are not signed in</p>
              <h3 className="text-xl font-extrabold text-white mb-1">Track your mood. Understand your patterns.</h3>
              <p className="text-[#A7F3D0] text-sm leading-relaxed">
                Sign in to log your daily mood, see your history as a chart, book sessions with a therapist, and track your healing journey.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/login" className="px-5 py-2.5 bg-white text-[#0D5C3D] font-bold rounded-full text-sm hover:bg-gray-100 active:scale-95 transition-all">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-[#10B981] text-white font-bold rounded-full text-sm hover:bg-[#059669] active:scale-95 transition-all">
                Create Account
              </Link>
            </div>
          </div>
        )}

        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-5">

              {/* Daily check-in */}
              <div className={`bg-white rounded-2xl border border-gray-100 p-6 ${!isLoggedIn ? "opacity-80" : ""}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="font-bold text-gray-900">Daily Check-in</h2>
                </div>

                {saveSuccess && (
                  <div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-sm rounded-xl px-4 py-2 mb-4">
                    Entry saved successfully.
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-3">How are you feeling today? (1-10)</p>
                <input
                  type="range" min="1" max="10" value={sliderValue}
                  onChange={e => setSliderValue(Number(e.target.value))}
                  className="w-full accent-[#10B981] mb-1"
                />
                <div className="flex justify-between text-xs text-gray-400 mb-5">
                  <span>Low</span>
                  <span className="text-2xl font-extrabold text-[#10B981]">{sliderValue}</span>
                  <span>Great</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Journal Note (Optional)</p>
                <textarea
                  value={journalNote}
                  onChange={e => setJournalNote(e.target.value)}
                  placeholder="What is making you feel this way?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] resize-none mb-4"
                />

                {isLoggedIn ? (
                  <button
                    onClick={handleSaveEntry} disabled={saving}
                    className="w-full py-3.5 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#059669] active:scale-95 disabled:opacity-60 transition-all"
                  >
                    {saving ? "Saving..." : "Save Entry"}
                  </button>
                ) : (
                  <div className="border-2 border-dashed border-[#A7F3D0] rounded-xl p-4 text-center bg-[#F0FDF4]">
                    <p className="text-sm font-semibold text-[#065F46] mb-1">
                      Sign in to save your mood and track your progress over time
                    </p>
                    <p className="text-xs text-[#10B981] mb-3">
                      Your chart, your history, your healing journey — all in one place
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Link href="/login" className="px-5 py-2 bg-[#10B981] text-white rounded-full text-xs font-bold hover:bg-[#059669] active:scale-95 transition-all">
                        Sign In
                      </Link>
                      <Link href="/register" className="px-5 py-2 border-2 border-[#10B981] text-[#10B981] rounded-full text-xs font-bold hover:bg-[#ECFDF5] active:scale-95 transition-all">
                        Create Account
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Book session card */}
              <div className="rounded-2xl p-6 relative overflow-hidden bg-[#0D5C3D]">
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white opacity-5 translate-x-8 translate-y-8"></div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">Ready to talk to someone?</h3>
                <p className="text-[#6EE7B7] text-sm leading-relaxed mb-4">
                  Book a session with a verified therapist and get the professional support you deserve.
                </p>
                {isLoggedIn ? (
                  <Link href="/messages" className="block w-full py-2.5 bg-[#10B981] text-white font-bold rounded-xl text-sm text-center hover:bg-[#059669] active:scale-95 transition-all">
                    Book Session with Therapist
                  </Link>
                ) : (
                  <Link href="/how-it-works" className="block w-full py-2.5 bg-[#10B981] text-white font-bold rounded-xl text-sm text-center hover:bg-[#059669] active:scale-95 transition-all">
                    See How Therapist Matching Works
                  </Link>
                )}
              </div>
            </div>

            {/* Mood chart */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
                      <svg width="20" height="20" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                    </div>
                    <h2 className="font-bold text-gray-900">Mood History</h2>
                  </div>
                  <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:border-[#10B981]">
                    <option>Last 7 Days</option>
                    <option>Last 14 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>

                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
                  {[0,2,4,6,8,10].map(v => {
                    const y = pT + iH - (v/10)*iH;
                    return <g key={v}><line x1={pL} y1={y} x2={chartW-20} y2={y} stroke="#F3F4F6" strokeWidth="1"/><text x={pL-8} y={y+4} fontSize="10" fill="#9CA3AF" textAnchor="end">{v}</text></g>;
                  })}
                  {chartLogs.length > 0 ? (
                    <>
                      {points.length > 1 && <polyline points={polyline} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
                      {points.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#10B981" stroke="white" strokeWidth="2"/>)}
                      {points.map((p,i) => <text key={i} x={p.x} y={chartH-5} fontSize="10" fill="#9CA3AF" textAnchor="middle">{p.day}</text>)}
                    </>
                  ) : (
                    <>
                      <polyline
                        points={`${pL},${pT+iH-(6/10)*iH} ${pL+iW/6},${pT+iH-(8/10)*iH} ${pL+iW*2/6},${pT+iH-(4/10)*iH} ${pL+iW*3/6},${pT+iH-(7/10)*iH} ${pL+iW*4/6},${pT+iH-(7/10)*iH} ${pL+iW*5/6},${pT+iH-(9/10)*iH} ${pL+iW},${pT+iH-(8/10)*iH}`}
                        fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"
                      />
                      {DAYS.map((day,i) => <text key={i} x={pL+(i/6)*iW} y={chartH-5} fontSize="10" fill="#9CA3AF" textAnchor="middle">{day}</text>)}
                    </>
                  )}
                </svg>

                {!isLoggedIn && (
                  <div className="mt-3 bg-[#ECFDF5] rounded-xl px-4 py-3 border border-[#A7F3D0]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#065F46] mb-0.5">This is a sample chart</p>
                        <p className="text-xs text-[#10B981]">Sign in to see your real mood history here</p>
                      </div>
                      <Link href="/register" className="px-4 py-1.5 bg-[#10B981] text-white text-xs font-bold rounded-full hover:bg-[#059669] flex-shrink-0">
                        Get Started
                      </Link>
                    </div>
                  </div>
                )}

                
              </div>

              {(isLoggedIn ? moodLogs.length > 0 : true) && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Recent Entries</h3>
                  <div className="space-y-2">
                    {(isLoggedIn ? moodLogs : DEMO_LOGS).slice(0,3).map(log => (
                      <div key={log.id} className="flex items-center gap-3 py-1">
                        <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[#10B981]">{log.moodScore}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700">{log.moodLabel}</p>
                          {log.notes && <p className="text-xs text-gray-400 truncate">{log.notes}</p>}
                        </div>
                        <p className="text-xs text-gray-400 flex-shrink-0">
                          {new Date(log.loggedAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Your Appointments</h2>
              <Link href="/messages" className="px-4 py-2 bg-[#10B981] text-white text-sm rounded-full font-semibold hover:bg-[#059669]">
                Book New Session
              </Link>
            </div>
            {!isLoggedIn ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-gray-500 mb-2 font-medium">Sign in to view and manage your appointments</p>
                <p className="text-gray-400 text-sm mb-5">Book sessions with verified therapists and track your upcoming schedule.</p>
                <div className="flex gap-3 justify-center">
                  <Link href="/login" className="px-5 py-2.5 bg-[#10B981] text-white rounded-full text-sm font-bold hover:bg-[#059669]">Sign In</Link>
                  <Link href="/register" className="px-5 py-2.5 border-2 border-[#10B981] text-[#10B981] rounded-full text-sm font-bold hover:bg-[#ECFDF5]">Create Account</Link>
                </div>
              </div>
            ) : appointments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-gray-400 mb-3">No appointments yet.</p>
                <Link href="/messages" className="text-[#10B981] font-semibold text-sm hover:underline">Book your first session</Link>
              </div>
            ) : (
              appointments.map(apt => (
                <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{apt.therapistName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(apt.scheduledAt).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
                    </p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusColors[apt.status]||"bg-gray-100 text-gray-500"}`}>
                    {apt.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
