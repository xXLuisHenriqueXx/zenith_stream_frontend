import { api } from "./api";

export const tokenService = {
  validateTokenRoute: async () => {
    try {
      const response = await api.get("/validate/token");

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/logout");

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
