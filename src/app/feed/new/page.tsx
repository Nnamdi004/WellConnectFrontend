"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { storyService } from "@/services/storyService";
import { categoryService } from "@/services/categoryService";

type Tag = { id: number; name: string };
type Category = { id: number; categoryId?: number; name: string };

export default function NewStoryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    categoryService.getAll().then(r => {
      const data: Category[] = r.data;
      // backend may return categoryId or id
      setCategories(data.map(c => ({ ...c, id: c.categoryId ?? c.id })));
    }).catch(() => {});
    categoryService.getTags().then(r => setTags(r.data)).catch(() => {});
  }, []);

  const toggleTag = (id: number) => setSelectedTags(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) { setError("Please select a category."); return; }
    setError(""); setLoading(true);
    try {
      await storyService.create({ title, content, categoryId, tagIds: selectedTags, isAnonymous, visibility: "PUBLIC" });
      setSuccess(true);
    } catch { setError("Could not publish. Please sign in and try again."); }
    finally { setLoading(false); }
  };

  if (success) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full border border-gray-100">
        <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4"><svg width="28" height="28" fill="none" stroke="#10B981" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Story Shared</h2>
        <p className="text-gray-500 text-sm mb-6">Your story has been submitted and will appear once approved. Thank you for your courage.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/feed" className="px-5 py-2 bg-[#10B981] text-white rounded-full text-sm font-semibold">Back to Feed</Link>
          <button onClick={() => { setSuccess(false); setTitle(""); setContent(""); }} className="px-5 py-2 border border-gray-200 text-gray-700 rounded-full text-sm font-semibold">Share Another</button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="#10B981"/>
            <path d="M18 27s-9-5.5-9-12a6 6 0 0 1 9-5.196A6 6 0 0 1 27 15c0 6.5-9 12-9 12z" fill="white" opacity="0.9"/>
            <path d="M13 18.5 l2.5 2.5 l5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold text-gray-900 tracking-tight">WellConnect</span>
        </Link>
        <Link href="/feed" className="text-sm text-gray-500 hover:text-gray-900">Cancel</Link>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8"><h1 className="text-3xl font-extrabold text-gray-900">Share Your Story</h1><p className="text-gray-500 mt-1 text-sm">Your words might be exactly what someone else needs to hear today.</p></div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Give your story a title" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50" /></div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              value={categoryId ?? ""}
              onChange={e => setCategoryId(Number(e.target.value))}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50 text-gray-700"
            >
              <option value="" disabled>Select a mental health topic...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Your Story</label><textarea value={content} onChange={e => setContent(e.target.value)} required rows={8} placeholder="Write your story here. Take your time. This is your space." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50 resize-none leading-relaxed" /><p className="text-xs text-gray-400 mt-1 text-right">{content.length} characters</p></div>
          {tags.length > 0 && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Tags <span className="text-gray-400 font-normal">(optional)</span></label><div className="flex flex-wrap gap-2">{tags.map(tag => <button key={tag.id} type="button" onClick={() => toggleTag(tag.id)} className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedTags.includes(tag.id) ? "bg-[#10B981] text-white border-[#10B981]" : "border-gray-200 text-gray-500 hover:border-[#10B981]"}`}>#{tag.name}</button>)}</div></div>}
          <div className="flex items-center justify-between py-4 border-t border-gray-50">
            <div><p className="text-sm font-semibold text-gray-700">Post anonymously</p><p className="text-xs text-gray-400 mt-0.5">Your name will not be shown</p></div>
            <button type="button" onClick={() => setIsAnonymous(!isAnonymous)} className={`relative w-12 h-6 rounded-full transition-colors ${isAnonymous ? "bg-[#10B981]" : "bg-gray-200"}`}><span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isAnonymous ? "translate-x-7" : "translate-x-1"}`} /></button>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] disabled:opacity-60">{loading ? "Publishing..." : "Share Story"}</button>
        </form>
      </div>
    </main>
  );
}
