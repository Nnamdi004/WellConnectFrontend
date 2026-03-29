import api from "@/lib/api";

export const authService = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  register: (username: string, email: string, password: string) =>
    api.post("/auth/register", { username, email, password }),

  therapistLogin: (email: string, password: string) =>
    api.post("/auth/therapist/login", { email, password }),

  adminLogin: (email: string, password: string) =>
    api.post("/auth/admin/login", { email, password }),
};
