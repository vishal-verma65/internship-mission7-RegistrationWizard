import { z } from "zod";

// Step 1 — Personal Information
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Please enter a valid date")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      return date < today;
    }, "Date of birth must be in the past"),
});

// Step 2 — Account Details
export const step2Schema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const fullSchema = step1Schema.and(step2Schema);