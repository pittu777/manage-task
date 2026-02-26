import z, { email, optional } from "zod";


export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 2 characters"),
        email: z.string().email("invalid email"),
        password: z.string().min(5, "password must contain 5 chars"),
        role: z.enum(["admin", "member"]).optional(),

    }),
});


export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(5, "Password must be at least 5 characters"),
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];