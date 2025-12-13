import * as z from "zod";

export const registerScheme = z
  .object({
    name: z
      .string()
      .nonempty("this field is required")
      .min(2, "Name must be at least 2 Charcters ")
      .max(20, "Max charcters is 20"),
    email: z
      .string()
      .nonempty("this field is required")
      .email("Not Valid Email"),
    password: z
      .string()
      .nonempty("this field is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      ),
    // rePassword:z.string().nonempty("this field is required").regex(/^[A-Z][a-z]+[@/d]+$^/),
    rePassword: z.string(),
    dateOfBirth: z.coerce.string(),
    gender: z.enum(["male", "female"]),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password don't match",
  });
