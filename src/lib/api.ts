const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

// ─── AUTH ─────────────────────────────────────────────────────────────────────

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
// POST /api/intake — body: { phq9Score, gad7Score }
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
// StoryResponse fields: storyId, authorUsername (Anonymous if isAnonymous), 
// categoryId, categoryName, title, content, isAnonymous, visibility, status,
// tags (List<String>), likeCount, commentCount, createdAt, updatedAt

export const getFeed = async () => {
  const res = await fetch(`${BASE_URL}/api/stories/feed`);
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json();
};

export const createStory = async (
  data: { title: string; content: string; categoryId: number; tagIds: number[]; isAnonymous: boolean; visibility: string },
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

// ─── LIKES (not reactions — backend uses likes) ───────────────────────────────

export const likeStory = async (storyId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/stories/${storyId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const unlikeStory = async (storyId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/stories/${storyId}/unlike`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
};

// ─── COMMENTS ────────────────────────────────────────────────────────────────
// CommentResponse: commentId, storyId, authorUsername, content, isAnonymous, createdAt

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

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/api/stories/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const getTags = async () => {
  const res = await fetch(`${BASE_URL}/api/stories/tags`);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
};

// ─── MOOD LOG ─────────────────────────────────────────────────────────────────
// DB: mood_label (VARCHAR), mood_score (INT), notes (TEXT), logged_at (TIMESTAMP)

export const logMood = async (
  data: { moodLabel: string; moodScore: number; notes: string },
  token: string
) => {
  const res = await fetch(`${BASE_URL}/api/mood`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getMoodHistory = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/mood/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch mood history");
  return res.json();
};

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
// DB: appointment_id, user_id, therapist_id, scheduled_at, status (ENUM), duration_mins

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

export const updateAppointmentStatus = async (id: number, status: string, token: string) => {
  const res = await fetch(`${BASE_URL}/api/appointments/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────

export const registerTherapist = async (
  data: { fullName: string; email: string; specialisation: string; password: string },
  token: string
) => {
  // Note: field is specialisation (not specialization) to match backend TherapistRegisterRequest
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

// ─── CHAT ─────────────────────────────────────────────────────────────────────
// chat_messages: message_text (TEXT), sender_type (ENUM: USER/THERAPIST), timestamp
// chat_sessions: mood_before VARCHAR(30), mood_after VARCHAR(30), status ENUM

export const getMySessions = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/chat/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
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

// ─── WEBSOCKET ────────────────────────────────────────────────────────────────
// WebSocket URL: ws://localhost:8081/ws/chat/{sessionId}?token={jwt}
// Send: { messageText: string, senderType: "USER" | "THERAPIST" }
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
