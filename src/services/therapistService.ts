import api from "@/lib/api";

export const therapistService = {
  getAppointments: (token: string) =>
    api.get("/therapists/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAvailability: (therapistId: number) =>
    api.get(`/therapists/${therapistId}/availability`),
};
