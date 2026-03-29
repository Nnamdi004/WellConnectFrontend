import api from "@/lib/api";

export const moodService = {
  log: (data: { moodLabel: string; moodScore: number; notes: string }) =>
    api.post("/moods", data),

  getHistory: () =>
    api.get("/moods"),
};
