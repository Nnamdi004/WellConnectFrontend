import api from "@/lib/api";

export const adminService = {
  // ── Therapists ──────────────────────────────────────────────────────────────
  registerTherapist: (data: {
    fullName: string;
    email: string;
    specialisation: string;
    password: string;
  }) => api.post("/admin/therapists/register", data),

  getAllTherapists: () =>
    api.get("/admin/therapists"),

  getTherapistById: (id: number) =>
    api.get(`/admin/therapists/${id}`),

  updateTherapist: (id: number, data: object) =>
    api.put(`/admin/therapists/${id}`, data),

  deleteTherapist: (id: number) =>
    api.delete(`/admin/therapists/${id}`),

  // ── Users ───────────────────────────────────────────────────────────────────
  getAllUsers: () =>
    api.get("/admin/users"),

  suspendUser: (userId: number) =>
    api.patch(`/admin/users/${userId}/suspend`, { status: "SUSPENDED" }),

  reinstateUser: (userId: number) =>
    api.patch(`/admin/users/${userId}/suspend`, { status: "ACTIVE" }),

  deleteUser: (userId: number) =>
    api.delete(`/admin/users/${userId}`),

  // ── Reports / Moderation ────────────────────────────────────────────────────
  getAllReports: () =>
    api.get("/admin/reports"),

  updateReport: (reportId: number, status: "DISMISSED" | "ACTION_TAKEN") =>
    api.put(`/admin/reports/${reportId}`, { status }),

  resolveReport: (reportId: number, suspendUser = false) =>
    api.put(`/admin/reports/${reportId}/resolve`, { suspendUser }),

  // ── Categories & Tags ───────────────────────────────────────────────────────
  createCategory: (name: string) =>
    api.post("/admin/categories", { name }),

  deleteCategory: (id: number) =>
    api.delete(`/admin/categories/${id}`),

  createTag: (name: string) =>
    api.post("/admin/tags", { name }),

  deleteTag: (id: number) =>
    api.delete(`/admin/tags/${id}`),

  // ── Admins ──────────────────────────────────────────────────────────────────
  getAllAdmins: () =>
    api.get("/admin/admins"),

  createAdmin: (data: { username: string; email: string; password: string }) =>
    api.post("/admin/admins", data),

  updateAdmin: (id: number, data: object) =>
    api.put(`/admin/admins/${id}`, data),

  deleteAdmin: (id: number) =>
    api.delete(`/admin/admins/${id}`),
};
