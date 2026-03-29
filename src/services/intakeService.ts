import api from "@/lib/api";

export const intakeService = {
  submit: (phq9Score: number, gad7Score: number) =>
    api.post("/intake", { phq9Score, gad7Score }),

  getMyResults: () =>
    api.get("/intake/me"),
};
