import { z } from "zod";

import { api } from "./api";
import { userLoginSchema, userRegisterSchema, watchContentSchema, watchLaterSchema } from "../schemas/userSchema";

type loginParams = z.infer<typeof userLoginSchema>;
type registerParamsBase = z.infer<typeof userRegisterSchema>;
type registerParams = Omit<registerParamsBase, "birthDate">;
type watchContentParams = z.infer<typeof watchContentSchema>;
type watchLaterParams = z.infer<typeof watchLaterSchema>;

export const userService = {
  login: async (params: loginParams) => {
    try {
      const response = await api.post("/user/login", params);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  register: async (params: registerParams) => {
    try {
      const response = await api.post("/user/register", params);
      
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  watchContent: async (params: watchContentParams) => {
    try {
      const response = await api.post("/user/watch-content", params);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  watchLater: async (params: watchLaterParams) => {
    try {
      const response = await api.post("/user/watch-later", params);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
