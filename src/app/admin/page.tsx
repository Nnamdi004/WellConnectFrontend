"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { registerTherapist, getAllTherapists, updateTherapist, deleteTherapist, getCategories, getTags } from "@/lib/api";

type Therapist = { therapistId: number; fullName: string; email: string; specialisation: string; status: string; createdAt: string };
type Report = { reportId: number; storyTitle: string; reporterName: string; reason: string; status: string; createdAt: string };
type Category = { categoryId: number; name: string };
type Tag = { tagId: number; name: string };

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview"|"therapists"|"moderation"|"taxonomy">("overview");
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTherapist, setNewTherapist] = useState({ fullName:"", email:"", specialisation:"", password:"" });
  const [provisioning, setProvisioning] = useState(false);
  const [provisionSuccess, setProvisionSuccess] = useState(false);
  const [provisionError, setProvisionError] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") || "" : "";

  useEffect(() => {
    getAllTherapists(token).then(setTherapists).catch(() => {});
    fetch(`${BASE}/api/admin/reports`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(setReports).catch(() => {});
    getCategories().then(setCategories).catch(() => {});
    getTags().then(setTags).catch(() => {});
  }, [BASE, token]);

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    setProvisioning(true);
    setProvisionError("");
    try {
      const created = await registerTherapist(newTherapist, token);
      setTherapists(prev => [...prev, created]);
      setNewTherapist({ fullName:"", email:"", specialisation:"", password:"" });
      setProvisionSuccess(true);
      setTimeout(() => setProvisionSuccess(false), 3000);
    } catch (err: unknown) {
      setProvisionError(err instanceof Error ? err.message : "Failed to create account.");
    } finally {
      setProvisioning(false);
    }
  };

  const handleReportAction = async (reportId: number, action: "DISMISSED"|"ACTION_TAKEN") => {
    try {
      await fetch(`${BASE}/api/admin/reports/${reportId}/status`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status: action }) });
      setReports(prev => prev.map(r => r.reportId === reportId ? { ...r, status: action } : r));
    } catch { alert("Failed to update report."); }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch(`${BASE}/api/admin/categories`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: newCategoryName }) });
      const newCat = await res.json();
      setCategories(prev => [...prev, newCat]);
      setNewCategoryName("");
    } catch { alert("Failed to add category."); }
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const res = await fetch(`${BASE}/api/admin/tags`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: newTagName }) });
      const newTag = await res.json();
      setTags(prev => [...prev, newTag]);
      setNewTagName("");
    } catch { alert("Failed to add tag."); }
  };

  const handleDeleteCategory = async (id: number) => {
    try { await fetch(`${BASE}/api/admin/categories/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); setCategories(prev => prev.filter(c => c.categoryId !== id)); } catch { alert("Failed."); }
  };

  const handleDeleteTag = async (id: number) => {
    try { await fetch(`${BASE}/api/admin/tags/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); setTags(prev => prev.filter(t => t.tagId !== id)); } catch { alert("Failed."); }
  };

  const handleSuspendTherapist = async (id: number) => {
    try {
      await updateTherapist(id, { status: "SUSPENDED" }, token);
      setTherapists(prev => prev.map(t => t.therapistId === id ? { ...t, status: "SUSPENDED" } : t));
    } catch { alert("Failed to suspend therapist."); }
  };

  const handleDeleteTherapist = async (id: number) => {
    try {
      await deleteTherapist(id, token);
      setTherapists(prev => prev.filter(t => t.therapistId !== id));
    } catch { alert("Failed to delete therapist."); }
  };

  const pendingReports = reports.filter(r => r.status === "PENDING").length;

  const handleSuspendUser = async (userId: number) => {
    if (!confirm("Are you sure you want to suspend this user?")) return;
    try {
      await fetch(`${BASE}/api/admin/users/${userId}/suspend`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "SUSPENDED" }),
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: "SUSPENDED" } : u));
    } catch { alert("Failed to suspend user."); }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to permanently delete this user? This cannot be undone.")) return;
    try {
      await fetch(`${BASE}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch { alert("Failed to delete user."); }
  };

  const handleReinstateUser = async (userId: number) => {
    try {
      await fetch(`${BASE}/api/admin/users/${userId}/suspend`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "ACTIVE" }),
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: "ACTIVE" } : u));
    } catch { alert("Failed to reinstate user."); }
  };

  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center"><span className="text-white font-black">W</span></div>
          <span className="font-bold text-white">WellConnect</span>
          <span className="px-2 py-0.5 bg-white/10 text-white text-xs rounded-full">Admin</span>
        </div>
        <Link href="/" className="text-white/50 text-sm hover:text-white">Sign Out</Link>
      </nav>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8"><h1 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h1><p className="text-gray-500 text-sm mt-1">Manage therapists, content moderation, and platform taxonomy</p></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{label:"Total Therapists",value:therapists.length,color:"#10B981"},{label:"Active Therapists",value:therapists.filter(t=>t.status==="ACTIVE").length,color:"#3B82F6"},{label:"Pending Reports",value:pendingReports,color:"#F59E0B"},{label:"Categories",value:categories.length,color:"#8B5CF6"}].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5"><p className="text-2xl font-extrabold" style={{color:s.color}}>{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.label}</p></div>
          ))}
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit flex-wrap">
          {(["overview","therapists","moderation","taxonomy","users"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${activeTab===tab?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
              {tab}{tab==="moderation"&&pendingReports>0&&<span className="ml-1.5 px-1.5 py-0.5 bg-yellow-400 text-white text-xs rounded-full">{pendingReports}</span>}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Recent Therapists</h2>
              {therapists.slice(0,4).map(t => (
                <div key={t.therapistId} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0"><span className="text-[#10B981] text-xs font-bold">{t.fullName[0]}</span></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-900 truncate">{t.fullName}</p><p className="text-xs text-gray-400 truncate">{t.specialisation}</p></div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.status==="ACTIVE"?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{t.status}</span>
                </div>
              ))}
              {therapists.length===0&&<p className="text-sm text-gray-400">No therapists yet.</p>}
              <button onClick={() => setActiveTab("therapists")} className="text-sm text-[#10B981] font-semibold mt-3 hover:underline">Manage all therapists</button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Pending Reports</h2>
              {reports.filter(r=>r.status==="PENDING").slice(0,4).map(r => (
                <div key={r.reportId} className="py-2 border-b border-gray-50 last:border-0"><p className="text-sm font-semibold text-gray-900 truncate">{r.storyTitle}</p><p className="text-xs text-gray-400 truncate">{r.reason}</p></div>
              ))}
              {pendingReports===0&&<p className="text-sm text-gray-400">No pending reports.</p>}
              <button onClick={() => setActiveTab("moderation")} className="text-sm text-[#10B981] font-semibold mt-3 hover:underline">View moderation queue</button>
            </div>
          </div>
        )}

        {activeTab === "therapists" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-1">Provision New Therapist Account</h2>
              <p className="text-sm text-gray-500 mb-5">Create a secure login for a verified mental health professional.</p>
              {provisionSuccess&&<div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-sm rounded-xl px-4 py-3 mb-4">Therapist account created successfully.</div>}
              {provisionError&&<div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{provisionError}</div>}
              <form onSubmit={handleProvision} className="grid md:grid-cols-2 gap-4">
                {[{key:"fullName",label:"Full Name",type:"text",ph:"Dr. Jane Smith"},{key:"email",label:"Professional Email",type:"email",ph:"dr.smith@example.com"},{key:"specialisation",label:"Specialisation",type:"text",ph:"Trauma and PTSD, CBT"},{key:"password",label:"Temporary Password",type:"password",ph:"Minimum 8 characters"}].map(f => (
                  <div key={f.key}><label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label><input type={f.type} value={newTherapist[f.key as keyof typeof newTherapist]} onChange={e => setNewTherapist(prev => ({...prev,[f.key]:e.target.value}))} required placeholder={f.ph} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50" /></div>
                ))}
                <div className="md:col-span-2"><button type="submit" disabled={provisioning} className="px-6 py-2.5 bg-[#10B981] text-white rounded-xl font-semibold text-sm hover:bg-[#059669] disabled:opacity-60">{provisioning?"Creating account...":"Create Therapist Account"}</button></div>
              </form>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">All Therapists ({therapists.length})</h2>
              {therapists.length===0?<p className="text-sm text-gray-400">No therapists provisioned yet.</p>:(
                <div className="space-y-3">{therapists.map(t => (
                  <div key={t.therapistId} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                    <div className="w-10 h-10 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0"><span className="text-[#10B981] font-bold">{t.fullName[0]}</span></div>
                    <div className="flex-1 min-w-0"><p className="font-semibold text-gray-900">{t.fullName}</p><p className="text-xs text-gray-500 truncate">{t.email}</p><p className="text-xs text-gray-400">{t.specialisation}</p></div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${t.status==="ACTIVE"?"bg-green-100 text-green-700":t.status==="SUSPENDED"?"bg-red-100 text-red-600":"bg-gray-100 text-gray-500"}`}>{t.status}</span>
                      {t.status==="ACTIVE"&&<button onClick={() => handleSuspendTherapist(t.therapistId)} className="text-xs text-orange-500 hover:underline">Suspend</button>}
                      <button onClick={() => handleDeleteTherapist(t.therapistId)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "moderation" && (
          <div className="space-y-3">
            <h2 className="font-bold text-gray-900">Content Reports Queue</h2>
            {reports.length===0?<div className="bg-white rounded-2xl border border-gray-100 p-10 text-center"><p className="text-gray-400">No reports submitted yet.</p></div>:reports.map(report => (
              <div key={report.reportId} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-2"><p className="font-semibold text-gray-900">{report.storyTitle}</p><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${report.status==="PENDING"?"bg-yellow-100 text-yellow-700":report.status==="DISMISSED"?"bg-gray-100 text-gray-500":"bg-red-100 text-red-600"}`}>{report.status}</span></div>
                <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Reported by:</span> {report.reporterName}</p>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mt-2">{report.reason}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(report.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</p>
                {report.status==="PENDING"&&<div className="flex gap-2 mt-4"><button onClick={() => handleReportAction(report.reportId,"ACTION_TAKEN")} className="px-4 py-1.5 bg-red-500 text-white text-xs rounded-full font-semibold hover:bg-red-600">Take Action</button><button onClick={() => handleReportAction(report.reportId,"DISMISSED")} className="px-4 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-full font-semibold hover:bg-gray-50">Dismiss</button></div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-gray-900">User Management</h2>
                  <p className="text-sm text-gray-500 mt-0.5">View, suspend, or remove community members</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    type="text" value={userSearch} onChange={e => setUserSearch(e.target.value)}
                    placeholder="Search by name or email..."
                    className="bg-transparent text-sm focus:outline-none text-gray-700 w-48"
                  />
                </div>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm">
                    {users.length === 0 ? "No users found. Connect the backend to load user data." : "No users match your search."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-bold text-sm">
                          {user.username?.[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 truncate">{user.username || "Unknown"}</p>
                          {user.reportCount && user.reportCount > 0 && (
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                              {user.reportCount} report{user.reportCount > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        <p className="text-xs text-gray-400">
                          Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                          user.status === "SUSPENDED" ? "bg-red-100 text-red-600" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {user.status}
                        </span>
                        {user.status === "ACTIVE" ? (
                          <button
                            onClick={() => handleSuspendUser(user.id)}
                            className="px-3 py-1.5 border border-yellow-200 text-yellow-600 text-xs rounded-full font-semibold hover:bg-yellow-50 transition-colors"
                          >
                            Suspend
                          </button>
                        ) : user.status === "SUSPENDED" ? (
                          <button
                            onClick={() => handleReinstateUser(user.id)}
                            className="px-3 py-1.5 border border-green-200 text-green-600 text-xs rounded-full font-semibold hover:bg-green-50 transition-colors"
                          >
                            Reinstate
                          </button>
                        ) : null}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1.5 border border-red-200 text-red-500 text-xs rounded-full font-semibold hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reported users quick view */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Users with Pending Reports</h2>
              {reports.filter(r => r.status === "PENDING").length === 0 ? (
                <p className="text-sm text-gray-400">No pending reports at this time.</p>
              ) : (
                <div className="space-y-3">
                  {reports.filter(r => r.status === "PENDING").map(report => (
                    <div key={report.id} className="flex items-start gap-4 p-4 border border-red-100 bg-red-50 rounded-xl">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{report.storyTitle}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          <span className="font-medium">Reported by:</span> {report.reporterName}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 bg-white rounded-lg px-3 py-1.5">{report.reason}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleReport(report.id, "ACTION_TAKEN")}
                          className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-full font-semibold hover:bg-red-600"
                        >
                          Take Action
                        </button>
                        <button
                          onClick={() => handleReport(report.id, "DISMISSED")}
                          className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-full font-semibold hover:bg-gray-50"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "taxonomy" && (
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Story Categories</h2>
              <div className="flex gap-2 mb-4"><input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="New category name" className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981]" onKeyDown={e => e.key==="Enter"&&handleAddCategory()} /><button onClick={handleAddCategory} className="px-4 py-2 bg-[#10B981] text-white rounded-xl text-sm font-semibold">Add</button></div>
              <div className="space-y-2">{categories.map(cat => <div key={cat.categoryId} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl"><span className="text-sm text-gray-700 font-medium">{cat.name}</span><button onClick={() => handleDeleteCategory(cat.categoryId)} className="text-gray-400 hover:text-red-500 transition-colors"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div>)}{categories.length===0&&<p className="text-sm text-gray-400">No categories yet.</p>}</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Story Tags</h2>
              <div className="flex gap-2 mb-4"><input type="text" value={newTagName} onChange={e => setNewTagName(e.target.value)} placeholder="New tag name" className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981]" onKeyDown={e => e.key==="Enter"&&handleAddTag()} /><button onClick={handleAddTag} className="px-4 py-2 bg-[#10B981] text-white rounded-xl text-sm font-semibold">Add</button></div>
              <div className="flex flex-wrap gap-2">{tags.map(tag => <div key={tag.tagId} className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 rounded-full"><span className="text-sm text-gray-700">#{tag.name}</span><button onClick={() => handleDeleteTag(tag.tagId)} className="text-gray-400 hover:text-red-500 ml-1"><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>)}{tags.length===0&&<p className="text-sm text-gray-400">No tags yet.</p>}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
