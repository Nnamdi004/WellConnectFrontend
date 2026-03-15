"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// StoryResponse from backend:
// storyId, authorUsername, categoryName, title, content, isAnonymous,
// tags (List<String>), likeCount, commentCount, createdAt
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

const POPULAR_TOPICS = ["Anxiety","Depression","Relationships","Grief","Work Stress","Self-Care","Trauma","Family"];

export default function FeedPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    fetch(`${BASE}/api/stories/feed`)
      .then(r => r.json()).then(setStories).catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, [BASE]);

  const handleLike = async (storyId: number) => {
    if (!token) { window.location.href = "/login"; return; }
    try {
      await fetch(`${BASE}/api/stories/${storyId}/like`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      fetch(`${BASE}/api/stories/feed`).then(r => r.json()).then(setStories).catch(() => {});
    } catch {}
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
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

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => handleLike(story.storyId)}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors text-sm"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    {story.likeCount || 0}
                  </button>
                  <Link
                    href={`/feed/${story.storyId}`}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-[#10B981] transition-colors text-sm"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
