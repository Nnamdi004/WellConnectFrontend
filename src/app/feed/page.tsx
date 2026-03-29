"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { storyService } from "@/services/storyService";
import { reportService } from "@/services/reportService";

type Story = {
  storyId: number;
  title: string;
  content: string;
  authorUsername: string;
  categoryName: string;
  tags: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
};

type ReactionType = "HEART" | "HUG" | "STRENGTH" | "PRAYER" | "SOLIDARITY";

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: "HEART",      emoji: "❤️",  label: "Heart" },
  { type: "HUG",        emoji: "🤗",  label: "Hug" },
  { type: "STRENGTH",   emoji: "💪",  label: "Strength" },
  { type: "PRAYER",     emoji: "🙏",  label: "Prayer" },
  { type: "SOLIDARITY", emoji: "✊",  label: "Solidarity" },
];

const POPULAR_TOPICS = ["Anxiety","Depression","Relationships","Grief","Work Stress","Self-Care","Trauma","Family"];

const REPORT_REASONS = [
  "Harmful or dangerous content",
  "Harassment or bullying",
  "Hate speech or discrimination",
  "Spam or misleading",
  "Violates community guidelines",
  "Other",
];

export default function FeedPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  // reactions: { [storyId]: { [ReactionType]: count } }
  const [reactions, setReactions] = useState<Record<number, Partial<Record<ReactionType, number>>>>({});
  // which reaction the current user has left per story
  const [myReactions, setMyReactions] = useState<Record<number, ReactionType | null>>({});
  // report modal state
  const [reportingStoryId, setReportingStoryId] = useState<number | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    storyService.getFeed()
      .then(r => setStories(r.data)).catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, [BASE]);

  const handleReact = async (storyId: number, type: ReactionType) => {
    if (!token) { window.location.href = "/login"; return; }
    const prev = myReactions[storyId];
    // optimistic update
    setMyReactions(m => ({ ...m, [storyId]: prev === type ? null : type }));
    setReactions(r => {
      const cur = { ...(r[storyId] || {}) };
      if (prev === type) {
        cur[type] = Math.max((cur[type] || 1) - 1, 0);
      } else {
        if (prev) cur[prev] = Math.max((cur[prev] || 1) - 1, 0);
        cur[type] = (cur[type] || 0) + 1;
      }
      return { ...r, [storyId]: cur };
    });
    try {
      if (prev === type) {
        await fetch(`${BASE}/api/stories/${storyId}/reactions/${type}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      } else {
        await fetch(`${BASE}/api/stories/${storyId}/reactions`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ reactionType: type }) });
      }
    } catch {}
  };

  const openReport = (storyId: number) => {
    if (!token) { window.location.href = "/login"; return; }
    setReportingStoryId(storyId);
    setReportReason("");
    setCustomReason("");
    setReportSuccess(false);
  };

  const submitReport = async () => {
    if (!reportingStoryId || !reportReason) return;
    setReportSubmitting(true);
    const reason = reportReason === "Other" ? customReason : reportReason;
    try {
      await reportService.submit({ storyId: reportingStoryId, reason });
      setReportSuccess(true);
      setTimeout(() => setReportingStoryId(null), 1800);
    } catch {}
    finally { setReportSubmitting(false); }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Report Modal */}
      {reportingStoryId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-7">
            {reportSuccess ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="26" height="26" fill="none" stroke="#10B981" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Report Submitted</h3>
                <p className="text-sm text-gray-500">Thank you. Our moderators will review this content.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">Report Content</h3>
                  <button onClick={() => setReportingStoryId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">Why are you reporting this story? Your report is anonymous.</p>
                <div className="space-y-2 mb-5">
                  {REPORT_REASONS.map(r => (
                    <button key={r} onClick={() => setReportReason(r)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border-2 transition-all font-medium ${reportReason === r ? "border-red-400 bg-red-50 text-red-700" : "border-gray-100 text-gray-600 hover:border-gray-200 bg-gray-50"}`}>
                      {r}
                    </button>
                  ))}
                </div>
                {reportReason === "Other" && (
                  <textarea
                    value={customReason} onChange={e => setCustomReason(e.target.value)}
                    placeholder="Please describe the issue..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50 resize-none mb-4"
                  />
                )}
                <button onClick={submitReport} disabled={!reportReason || reportSubmitting || (reportReason === "Other" && !customReason.trim())}
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 disabled:opacity-50 transition-colors">
                  {reportSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Community Hub</h1>
              <p className="text-gray-500 text-sm mt-1">A safe space to share, listen, and support each other.</p>
            </div>
            <Link href="/feed/new" className="flex items-center gap-2 px-5 py-2.5 bg-[#10B981] text-white rounded-full font-semibold text-sm hover:bg-[#059669] active:scale-95 transition-all">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Share Your Story
            </Link>
          </div>

          {loading && (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
                  <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && stories.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-gray-500 mb-2">No stories yet.</p>
              <p className="text-gray-400 text-sm mb-5">Be the first to share your experience.</p>
              <Link href="/feed/new" className="px-6 py-2.5 bg-[#10B981] text-white rounded-full text-sm font-semibold hover:bg-[#059669]">
                Share a Story
              </Link>
            </div>
          )}

          <div className="space-y-4">
            {stories.map(story => (
              <article key={story.storyId} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{story.authorUsername}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(story.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})} in{" "}
                        <span className="text-[#10B981] font-medium">{story.categoryName}</span>
                      </p>
                    </div>
                  </div>
                  {/* Report button */}
                  <button onClick={() => openReport(story.storyId)}
                    title="Report this story"
                    className="flex items-center gap-1 text-gray-300 hover:text-red-400 transition-colors text-xs font-medium px-2 py-1 rounded-lg hover:bg-red-50">
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="4" y1="22" x2="4" y2="15"/>
                    </svg>
                    Report
                  </button>
                </div>

                <Link href={`/feed/${story.storyId}`}>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#10B981] transition-colors cursor-pointer">
                    {story.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{story.content}</p>

                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {story.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-400 text-xs rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}

                {/* Reaction bar */}
                <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-50 flex-wrap">
                  {REACTIONS.map(({ type, emoji, label }) => {
                    const count = reactions[story.storyId]?.[type] || 0;
                    const active = myReactions[story.storyId] === type;
                    return (
                      <button key={type} onClick={() => handleReact(story.storyId, type)}
                        title={label}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                          active
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm"
                            : "border-gray-100 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                        }`}>
                        <span className="text-sm leading-none">{emoji}</span>
                        {count > 0 && <span>{count}</span>}
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    );
                  })}
                  <Link
                    href={`/feed/${story.storyId}`}
                    className="ml-auto flex items-center gap-1.5 text-gray-400 hover:text-[#10B981] transition-colors text-xs font-medium"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {story.commentCount || 0} Comments
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="w-72 flex-shrink-0 space-y-5">
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Community Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Treat others with respect and empathy","No hate speech or harassment","Respect privacy and anonymity","Use trigger warnings for sensitive topics"].map(g => (
                <li key={g} className="flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5 flex-shrink-0">•</span>{g}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOPICS.map(topic => (
                <button key={topic} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full hover:bg-[#ECFDF5] hover:text-[#10B981] transition-colors font-medium">
                  {topic}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Need immediate help?</h3>
            <p className="text-sm text-gray-500 mb-3">Rwanda Crisis Line is available 24 hours a day.</p>
            <a href="tel:3026" className="block w-full py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center hover:bg-red-100 transition-colors">
              Call 3026
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
