import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 (expired token) globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api$/, "") || "http://localhost:8081";

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export const userLogin = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { token, username, role }
};

export const adminLogin = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { token, username, role }
};

export const therapistLogin = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/therapist/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { token, username, role }
};

export const userRegister = async (username: string, email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── INTAKE ───────────────────────────────────────────────────────────────────
// POST /api/intake  — body: { phq9Score, gad7Score }
// GET  /api/intake/me — returns { intakeId, userId, phq9Score, gad7Score, severityLevel, submittedAt }

export const submitIntake = async (phq9Score: number, gad7Score: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/intake`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ phq9Score, gad7Score }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getMyIntake = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/intake/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── STORIES / FEED ───────────────────────────────────────────────────────────
// GET  /api/stories           — public story feed
// POST /api/stories           — create a new story
// GET  /api/stories/{id}      — get story by ID
// POST /api/stories/{id}/like — like a story
// DELETE /api/stories/{id}/like — unlike a story

export const getFeed = async () => {
  const res = await fetch(`${BASE_URL}/api/stories`);
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json();
};

export const getStory = async (id: number) => {
  const res = await fetch(`${BASE_URL}/api/stories/${id}`);
  if (!res.ok) throw new Error("Failed to fetch story");
  return res.json();
};

export const createStory = async (
  data: { title: string; content: string; categoryId: number; tagIds: number[]; isAnonymous: boolean; visibility?: string },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/stories`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const likeStory = async (storyId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/stories/${storyId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const unlikeStory = async (storyId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/stories/${storyId}/like`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
};

// ─── COMMENTS ────────────────────────────────────────────────────────────────
// GET  /api/stories/{storyId}/comments — get all comments
// POST /api/stories/{storyId}/comments — add a comment

export const getComments = async (storyId: number) => {
  const res = await fetch(`${BASE_URL}/api/stories/${storyId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

export const addComment = async (
  storyId: number,
  content: string,
  isAnonymous: boolean,
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/stories/${storyId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content, isAnonymous }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── CATEGORIES & TAGS ────────────────────────────────────────────────────────
// GET /api/categories — all categories
// GET /api/tags       — all tags

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const getTags = async () => {
  const res = await fetch(`${BASE_URL}/api/tags`);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
};

// ─── CONTENT REPORTS ─────────────────────────────────────────────────────────
// POST /api/reports                          — submit a content report
// PUT  /api/admin/reports/{reportId}         — update report status (Admin only)
// PUT  /api/admin/reports/{reportId}/resolve — resolve: removes story & optionally suspends user (Admin only)
// GET  /api/admin/reports                    — get all pending reports (Admin only)

export const submitReport = async (
  data: { storyId: number; reason: string },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateReport = async (
  reportId: number,
  status: "DISMISSED" | "ACTION_TAKEN",
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/admin/reports/${reportId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const resolveReport = async (
  reportId: number,
  data: { suspendUser?: boolean },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/admin/reports/${reportId}/resolve`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getAllReports = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/admin/reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
};

// ─── MOOD LOG ─────────────────────────────────────────────────────────────────
// POST /api/moods — log a mood entry
// GET  /api/moods — get mood history

export const logMood = async (
  data: { moodLabel: string; moodScore: number; notes: string },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/moods`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getMoodHistory = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/moods`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch mood history");
  return res.json();
};

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
// POST /api/appointments             — book an appointment (user)
// GET  /api/appointments             — get user's appointments
// GET  /api/therapists/appointments  — get therapist's appointments (Therapist/Admin only)

export const getMyAppointments = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/appointments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
};

export const bookAppointment = async (
  data: { therapistId: number; scheduledAt: string; durationMins: number },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getTherapistAppointments = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/therapists/appointments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch therapist appointments");
  return res.json();
};

// ─── CHAT ─────────────────────────────────────────────────────────────────────
// POST /api/chat/{appointmentId}/start  — start a chat session from an appointment
// PUT  /api/chat/{sessionId}/close      — close a chat session
// GET  /api/chat/sessions/{id}/messages — get messages for a session
// POST /api/chat/sessions/{id}/messages — send a message

export const startChatSession = async (appointmentId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/chat/${appointmentId}/start`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const closeChatSession = async (sessionId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/chat/${sessionId}/close`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
};

export const getSessionMessages = async (sessionId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
};

export const sendChatMessage = async (
  sessionId: number,
  messageText: string,
  senderType: "USER" | "THERAPIST",
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ messageText, senderType }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateSessionMood = async (
  sessionId: number,
  data: { moodBefore?: string; moodAfter?: string },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}/mood`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
// GET /api/notifications/me       — get my notifications
// PUT /api/notifications/{id}/read — mark notification as read

export const getMyNotifications = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/notifications/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
};

export const markNotificationRead = async (id: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/notifications/${id}/read`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
};

// ─── ADMIN — THERAPISTS ───────────────────────────────────────────────────────
// POST /api/admin/therapists/register — register a new therapist
// GET  /api/admin/therapists          — get all therapists
// GET  /api/admin/therapists/{id}     — get therapist by ID
// PUT  /api/admin/therapists/{id}     — update therapist
// DELETE /api/admin/therapists/{id}   — delete therapist
// GET  /api/therapists/{id}/availability — get availability

export const registerTherapist = async (
  data: { fullName: string; email: string; specialisation: string; password: string },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/admin/therapists/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getAllTherapists = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/admin/therapists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch therapists");
  return res.json();
};

export const updateTherapist = async (id: number, data: object, token: string) => {
  const res = await fetch(`${BASE_URL}/api/admin/therapists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteTherapist = async (id: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/admin/therapists/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
};

export const getTherapistAvailability = async (id: number) => {
  const res = await fetch(`${BASE_URL}/api/therapists/${id}/availability`);
  if (!res.ok) throw new Error("Failed to fetch availability");
  return res.json();
};

// ─── WEBSOCKET ────────────────────────────────────────────────────────────────
// ws://<host>/ws/chat/{sessionId}?token={jwt}
// Send:    { messageText: string, senderType: "USER" | "THERAPIST" }
// Receive: { id, messageText, senderType, timestamp }

export const createWebSocket = (sessionId: number, token: string): WebSocket => {
  const wsBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081").replace("http", "ws");
  return new WebSocket(`${wsBase}/ws/chat/${sessionId}?token=${token}`);
};

// ─── TOKEN HELPERS ────────────────────────────────────────────────────────────

export const getToken = (role: "user" | "therapist" | "admin"): string => {
  if (typeof window === "undefined") return "";
  if (role === "therapist") return localStorage.getItem("therapist_token") || "";
  if (role === "admin") return localStorage.getItem("admin_token") || "";
  return localStorage.getItem("token") || "";
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("therapist_token");
  localStorage.removeItem("admin_token");
};
