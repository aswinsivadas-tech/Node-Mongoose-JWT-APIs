import Joi from "joi";

export const studentValidation = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/) // allows letters and spaces
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Student name is required",
      "string.min": "Student name must be at least 2 characters",
      "string.max": "Student name cannot exceed 50 characters",
      "string.pattern.base": "Student name can only contain letters and spaces (e.g., 'John Doe')",
      "any.required": "Student name is required",
    }),
  marks: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": "Marks must be a number",
      "number.min": "Marks cannot be less than 0",
      "number.max": "Marks cannot exceed 100",
      "any.required": "Marks are required",
    }),
  class: Joi.string()
    .min(1)
    .max(10)
    .required()
    .messages({
      "string.empty": "Class is required",
      "string.min": "Class must be at least 1 character",
      "string.max": "Class cannot exceed 10 characters",
      "any.required": "Class is required",
    }),
});

export const studentUpdateValidation = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/) // letters and spaces
    .min(2)
    .max(50)
    .messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
      "string.pattern.base": "Name can only contain letters and spaces (e.g., 'John Doe')",
    }),
  marks: Joi.number()
    .min(0)
    .max(100)
    .messages({
      "number.base": "Marks must be a number",
      "number.min": "Marks cannot be less than 0",
      "number.max": "Marks cannot exceed 100",
    }),
  class: Joi.string()
    .min(1)
    .max(10)
    .messages({
      "string.min": "Class must be at least 1 character",
      "string.max": "Class cannot exceed 10 characters",
    }),
}).min(1); // at least one field required
