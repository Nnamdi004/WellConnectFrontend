"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  User,
  Mail,
  FileText,
  Sun,
  Moon,
  LogOut,
  Save,
  CheckCircle2,
  Camera,
  AlertCircle,
} from "lucide-react";

type UserProfile = {
  username: string;
  email: string;
  displayName: string;
  bio: string;
  joinedAt: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function SettingsPage() {
  const router = useRouter();
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    email: "",
    displayName: "",
    bio: "",
    joinedAt: "",
  });
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState<"profile" | "appearance" | "account">("profile");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    // Load saved theme
    const saved = localStorage.getItem("wc_theme");
    setIsDark(saved === "dark");

    // Fetch profile
    fetch(`${BASE}/api/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setProfile(data);
          setDisplayName(data.displayName || data.username || "");
          setBio(data.bio || "");
        } else {
          // Fallback: derive from token payload (jwt decode without library)
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const fallback = { username: payload.sub || "", email: payload.email || "", displayName: payload.sub || "", bio: "", joinedAt: "" };
            setProfile(fallback);
            setDisplayName(fallback.displayName);
          } catch {}
        }
      })
      .catch(() => {});
  }, [BASE, router]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("wc_theme", next ? "dark" : "light");
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token") || "";
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch(`${BASE}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ displayName, bio }),
      });
      if (!res.ok) throw new Error();
      setProfile(prev => ({ ...prev, displayName, bio }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("therapist_token");
    localStorage.removeItem("admin_token");
    router.push("/");
  };

  const avatarLabel = getInitials(displayName || profile.username || "U");
  const avatarColors = ["#10B981", "#6366F1", "#F59E0B", "#EF4444", "#3B82F6"];
  const avatarColor = avatarColors[(profile.username?.charCodeAt(0) || 0) % avatarColors.length];

  const sections = [
    { id: "profile" as const, label: "Profile", icon: <User size={16} /> },
    { id: "appearance" as const, label: "Appearance", icon: isDark ? <Moon size={16} /> : <Sun size={16} /> },
    { id: "account" as const, label: "Account", icon: <Mail size={16} /> },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage your profile, preferences, and account.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar nav */}
          <aside className="md:w-52 flex-shrink-0">
            <nav className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-2 space-y-1">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                    activeSection === s.id
                      ? "bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
              <div className="border-t border-gray-100 dark:border-slate-700 pt-1 mt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-5">

            {/* ── PROFILE SECTION ── */}
            {activeSection === "profile" && (
              <>
                {/* Avatar card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Profile Picture</h2>
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-extrabold shadow-lg"
                        style={{ backgroundColor: avatarColor }}
                      >
                        {avatarLabel}
                      </div>
                      <div className="absolute bottom-0 right-0 w-7 h-7 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-full flex items-center justify-center shadow-sm">
                        <Camera size={13} className="text-gray-500 dark:text-slate-300" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{displayName || profile.username}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">@{profile.username}</p>
                      <p className="text-xs text-[#10B981] mt-1">Avatar uses your initials</p>
                    </div>
                  </div>
                </div>

                {/* Edit profile form */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Edit Profile</h2>

                  {saveSuccess && (
                    <div className="flex items-center gap-2 bg-[#ECFDF5] dark:bg-emerald-900/30 border border-[#A7F3D0] dark:border-emerald-700 text-[#065F46] dark:text-emerald-400 text-sm rounded-xl px-4 py-3 mb-5">
                      <CheckCircle2 size={16} />
                      Profile updated successfully.
                    </div>
                  )}

                  {saveError && (
                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
                      <AlertCircle size={16} />
                      {saveError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5"><User size={14} /> Display Name</span>
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        placeholder="How should we call you?"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5"><FileText size={14} /> Bio <span className="text-gray-400 font-normal">(optional)</span></span>
                      </label>
                      <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        placeholder="A short note about yourself..."
                        rows={3}
                        maxLength={200}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:border-[#10B981] bg-gray-50 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 resize-none"
                      />
                      <p className="text-xs text-gray-400 dark:text-slate-500 text-right mt-1">{bio.length}/200</p>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="mt-5 flex items-center gap-2 px-6 py-2.5 bg-[#10B981] text-white text-sm font-semibold rounded-full hover:bg-[#059669] active:scale-95 disabled:opacity-60 transition-all shadow-sm shadow-emerald-200"
                  >
                    <Save size={15} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </>
            )}

            {/* ── APPEARANCE SECTION ── */}
            {activeSection === "appearance" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Appearance</h2>
                <p className="text-gray-500 dark:text-slate-400 text-sm mb-6">Choose how WellConnect looks for you.</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Light mode card */}
                  <button
                    onClick={() => isDark && toggleTheme()}
                    className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                      !isDark
                        ? "border-[#10B981] bg-[#ECFDF5]"
                        : "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
                    }`}
                  >
                    {!isDark && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 border border-gray-100">
                      <Sun size={20} className="text-amber-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Light</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Clean, bright interface</p>
                  </button>

                  {/* Dark mode card */}
                  <button
                    onClick={() => !isDark && toggleTheme()}
                    className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                      isDark
                        ? "border-[#10B981] bg-emerald-900/20 dark:bg-emerald-900/30"
                        : "border-gray-200 dark:border-slate-600 hover:border-gray-300"
                    }`}
                  >
                    {isDark && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                    <div className="w-10 h-10 bg-slate-800 rounded-xl shadow-sm flex items-center justify-center mb-3 border border-slate-700">
                      <Moon size={20} className="text-indigo-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Dark</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Easy on the eyes at night</p>
                  </button>
                </div>

                {/* Quick toggle row */}
                <div className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    {isDark ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-amber-400" />}
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {isDark ? "Dark mode" : "Light mode"} is active
                      </p>
                      <p className="text-xs text-gray-400 dark:text-slate-400">Saved to your device</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative w-12 h-6 rounded-full transition-colors ${isDark ? "bg-indigo-500" : "bg-[#10B981]"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDark ? "translate-x-7" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            )}

            {/* ── ACCOUNT SECTION ── */}
            {activeSection === "account" && (
              <>
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Account Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Username</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl">
                        <User size={15} className="text-gray-400 dark:text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-slate-200">{profile.username || "—"}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Email</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl">
                        <Mail size={15} className="text-gray-400 dark:text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-slate-200">{profile.email || "Linked via Google"}</span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5 ml-1">Email is managed through your Google account.</p>
                    </div>
                    {profile.joinedAt && (
                      <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Member Since</label>
                        <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-700 dark:text-slate-200">
                          {new Date(profile.joinedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sign out */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Sign Out</h2>
                  <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">
                    You will be signed out of your account on this device.
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-6 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-95 transition-all border border-red-100 dark:border-red-800"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
