"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const SAMPLE_LOGS = [
  { day: "Mon", score: 6, label: "Fine", note: "Started the week feeling okay" },
  { day: "Tue", score: 8, label: "Great", note: "Good therapy session today" },
  { day: "Wed", score: 4, label: "Low", note: "Difficult conversation with family" },
  { day: "Thu", score: 5, label: "Neutral", note: "" },
  { day: "Fri", score: 7, label: "Good", note: "Went for a walk, felt better" },
  { day: "Sat", score: 9, label: "Excellent", note: "Best day this week" },
  { day: "Sun", score: 8, label: "Great", note: "Feeling hopeful" },
];

const SCORE_COLORS: Record<number, string> = {
  1: "#EF4444", 2: "#EF4444", 3: "#F97316",
  4: "#F59E0B", 5: "#84CC16", 6: "#22C55E",
  7: "#10B981", 8: "#06B6D4", 9: "#3B82F6", 10: "#8B5CF6",
};

export default function MoodTrackingPage() {
  const chartH = 160; const chartW = 500; const pL = 30; const pB = 25; const pT = 15;
  const iW = chartW - pL - 15; const iH = chartH - pB - pT;
  const points = SAMPLE_LOGS.map((log, i) => ({
    x: pL + (i / (SAMPLE_LOGS.length - 1)) * iW,
    y: pT + iH - (log.score / 10) * iH,
    score: log.score,
    day: log.day,
    color: SCORE_COLORS[log.score],
  }));
  const polyline = points.map(p => p.x + "," + p.y).join(" ");

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-3">Feature Overview</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Mood Tracking</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Check in daily, see your emotional patterns over time, and share your progress with your therapist.
            Small daily moments of reflection lead to big insights.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-14">

        {/* SECTION 1 — Daily check-in preview */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECFDF5] text-[#10B981] text-xs font-bold rounded-full mb-4">
              Step 1
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Log your mood in seconds</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Every day, open your dashboard and slide to the number that best describes how you are feeling.
              Add a short note if you want — it helps you remember what was happening that day.
            </p>
            <ul className="space-y-2">
              {["Takes less than 30 seconds","Optional journal note for context","No judgment — all entries are private"].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Check-in mockup */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
                <svg width="18" height="18" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">Daily Check-in</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">How are you feeling today? (1-10)</p>
            <div className="relative mb-1">
              <div className="w-full h-2 bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#10B981] rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: "70%" }}>
                <div className="w-5 h-5 bg-white border-2 border-[#10B981] rounded-full shadow-md"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>Low</span>
              <span className="text-2xl font-extrabold text-[#10B981]">7</span>
              <span>Great</span>
            </div>
            <textarea
              readOnly
              defaultValue="Went for a walk this morning, feeling much better"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 bg-gray-50 resize-none mb-3"
            />
            <div className="w-full py-2.5 bg-[#10B981] text-white font-bold rounded-xl text-sm text-center">
              Save Entry
            </div>
          </div>
        </div>

        {/* SECTION 2 — Chart preview */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Chart mockup */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Mood History</h3>
              <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">Last 7 Days</span>
            </div>
            <svg viewBox={"0 0 " + chartW + " " + chartH} className="w-full">
              {[0,2,4,6,8,10].map(v => {
                const y = pT + iH - (v/10)*iH;
                return (
                  <g key={v}>
                    <line x1={pL} y1={y} x2={chartW-15} y2={y} stroke="#F3F4F6" strokeWidth="1"/>
                    <text x={pL-6} y={y+4} fontSize="9" fill="#9CA3AF" textAnchor="end">{v}</text>
                  </g>
                );
              })}
              <polyline points={polyline} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill={p.color} stroke="white" strokeWidth="2"/>
                  <text x={p.x} y={chartH-5} fontSize="9" fill="#9CA3AF" textAnchor="middle">{p.day}</text>
                </g>
              ))}
            </svg>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECFDF5] text-[#10B981] text-xs font-bold rounded-full mb-4">
              Step 2
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">See your patterns over time</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              After a few days of logging, your mood history appears as a chart. You can see which days were harder,
              spot triggers, and understand what helps you feel better.
            </p>
            <ul className="space-y-2">
              {["7-day and 30-day views","Color-coded score dots","Notes attached to each data point","Shareable with your therapist"].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SECTION 3 — Log history */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECFDF5] text-[#10B981] text-xs font-bold rounded-full mb-4">
              Step 3
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Review your full history</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Every entry you save is stored securely in your private log.
              Review past notes, track long-term trends, and see how far you have come on your healing journey.
            </p>
            <ul className="space-y-2">
              {["Full entry history with notes","Completely private — only you can see it","Helps therapists provide better care","Available on any device"].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Log history mockup */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Recent Entries</h3>
            <div className="space-y-3">
              {SAMPLE_LOGS.slice(0,4).map(log => (
                <div key={log.day} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: SCORE_COLORS[log.score] }}>
                    {log.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{log.label}</p>
                    {log.note && <p className="text-xs text-gray-400 truncate">{log.note}</p>}
                  </div>
                  <p className="text-xs text-gray-400 flex-shrink-0">{log.day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0D5C3D] rounded-3xl px-10 py-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white opacity-5 translate-x-16 -translate-y-16"></div>
          <h2 className="text-3xl font-extrabold text-white mb-3 relative z-10">
            Start tracking your mood today
          </h2>
          <p className="text-[#6EE7B7] mb-7 relative z-10">
            Free to use. Takes 30 seconds a day. Makes a real difference.
          </p>
          <div className="flex gap-4 justify-center relative z-10">
            <Link href="/register" className="px-8 py-3.5 bg-[#10B981] text-white font-bold rounded-full hover:bg-[#059669] active:scale-95 transition-all">
              Create Free Account
            </Link>
            <Link href="/dashboard" className="px-8 py-3.5 bg-white text-[#0D5C3D] font-bold rounded-full hover:bg-gray-100 active:scale-95 transition-all">
              See Dashboard Preview
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
