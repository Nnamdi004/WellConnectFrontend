import api from "@/lib/api";

export const notificationService = {
  getMyNotifications: () =>
    api.get("/notifications/me"),

  markRead: (id: number) =>
    api.put(`/notifications/${id}/read`),
};
