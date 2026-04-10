import { z } from "zod";

export const UserLoginRequestSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string(),
});