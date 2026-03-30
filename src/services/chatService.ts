import api from "@/lib/api";

export const chatService = {
  startSession: (appointmentId: number) =>
    api.post(`/chat/${appointmentId}/start`),

  closeSession: (sessionId: number) =>
    api.put(`/chat/${sessionId}/close`),

  getMessages: (sessionId: number) =>
    api.get(`/chat/sessions/${sessionId}/messages`),

  sendMessage: (
    sessionId: number,
    messageText: string,
    senderType: "USER" | "THERAPIST"
  ) => api.post(`/chat/sessions/${sessionId}/messages`, { messageText, senderType }),

  updateMood: (
    sessionId: number,
    data: { moodBefore?: string; moodAfter?: string }
  ) => api.patch(`/chat/sessions/${sessionId}/mood`, data),

  createWebSocket: (sessionId: number, token: string): WebSocket => {
    const wsBase = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8081";
    return new WebSocket(`${wsBase}/ws/chat/${sessionId}?token=${token}`);
  },
};
