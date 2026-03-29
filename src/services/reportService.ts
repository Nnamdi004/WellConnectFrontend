import api from "@/lib/api";

export const reportService = {
  submit: (data: { storyId: number; reason: string }) =>
    api.post("/reports", data),
};
