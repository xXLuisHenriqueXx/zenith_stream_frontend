import { z } from "zod";

import { api } from "./api";
import { adminLoginSchema } from "../schemas/adminSchemas";

type loginParams = z.infer<typeof adminLoginSchema>;

export const adminService = {
  login: async (params: loginParams) => {
    try {
      const response = await api.post("/admin/login", params);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
