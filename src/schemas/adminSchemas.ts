import { z } from "zod";

export const adminLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must to have at least 8 characteres" }),
    accessKey: z.string().nonempty({ message: "Access key is required" }),
});