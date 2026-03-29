import api from "@/lib/api";

export const storyService = {
  getFeed: () =>
    api.get("/stories"),

  getById: (id: number) =>
    api.get(`/stories/${id}`),

  create: (data: {
    title: string;
    content: string;
    categoryId: number;
    tagIds: number[];
    isAnonymous: boolean;
    visibility?: string;
  }) => api.post("/stories", data),

  like: (storyId: number) =>
    api.post(`/stories/${storyId}/like`),

  unlike: (storyId: number) =>
    api.delete(`/stories/${storyId}/like`),

  getComments: (storyId: number) =>
    api.get(`/stories/${storyId}/comments`),

  addComment: (storyId: number, content: string, isAnonymous: boolean) =>
    api.post(`/stories/${storyId}/comments`, { content, isAnonymous }),
};
