import Joi from "joi";

export const registerValidation = Joi.object({
  username: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/) // letters with optional spaces btw words
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters long",
      "string.pattern.base":
        "Username can only contain letters and spaces (e.g., 'John Doe')",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
  }),
  role: Joi.string().valid("user", "admin").default("user"),
  age: Joi.number().min(1).max(150).optional().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 1",
    "number.max": "Age cannot exceed 150",
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});
