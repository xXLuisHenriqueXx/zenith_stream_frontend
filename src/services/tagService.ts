import { z } from "zod";

import { api } from "./api";
import { createTagSchema, getContentByTagSchema, updateTagSchema } from "../schemas/tagSchema";

type getContentByTagParams = z.input<typeof getContentByTagSchema>;
type createTagParams = z.input<typeof createTagSchema>;
type updateTagParams = z.input<typeof updateTagSchema>;

export const tagService = {
  getAll: async () => {
    try {
      const response = await api.get("/tag");

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getContentByTag: async (params: getContentByTagParams) => {
    try {
      const response = await api.post("/tag/content", params);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  create: async (params: createTagParams) => {
    try {
      const response = await api.post("/tag", params);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  update: async (params: updateTagParams) => {
    try {
      const response = await api.put(`/tag/${params.id}`, params);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/tag/${id}`);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
