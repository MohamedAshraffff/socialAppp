import * as z from "zod"; 


export const loginScheme = z.object({email: z
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
      ),})
