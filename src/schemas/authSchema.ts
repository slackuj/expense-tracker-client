import { z } from "zod";

const strongPasswordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const UserRegisterRequestSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters"),
    email: z.email("Please enter a valid email address"),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    }
);

export const UserLoginRequestSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "The password you entered is incorrect"),
});