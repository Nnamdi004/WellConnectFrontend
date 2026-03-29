import api from "@/lib/api";

export const appointmentService = {
  getMyAppointments: () =>
    api.get("/appointments"),

  book: (data: { therapistId: number; scheduledAt: string; durationMins: number }) =>
    api.post("/appointments", data),
};
