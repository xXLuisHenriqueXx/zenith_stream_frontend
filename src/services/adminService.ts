import { api } from "@services/api";
import { adminLoginSchema } from "@schemas/adminSchemas";
import { z } from "zod";

type loginParams = z.infer<typeof adminLoginSchema>;

export const adminService = {
    login: async (params: loginParams) => {
        try {
            const response = await api.post("/admin/login", params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    }
};