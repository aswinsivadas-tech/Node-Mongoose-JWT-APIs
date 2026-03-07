import Joi from "joi";

export const productValidation = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Product title is required",
      "string.min": "Product title must be at least 2 characters",
      "string.max": "Product title cannot exceed 100 characters",
      "any.required": "Product title is required",
    }),
  author: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Author name is required",
      "string.min": "Author name must be at least 2 characters",
      "string.max": "Author name cannot exceed 100 characters",
      "any.required": "Author name is required",
    }),
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),
  category: Joi.string().optional().messages({
    "string.empty": "Category cannot be empty",
  }),
  publisher: Joi.string().optional(),
  isbn: Joi.string().optional(),
  stock: Joi.number().min(0).optional().messages({
    "number.min": "Stock cannot be negative",
  }),
});


export const productUpdateValidation = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .messages({
      "string.min": "Product title must be at least 2 characters",
      "string.max": "Product title cannot exceed 100 characters",
    }),
  author: Joi.string()
    .min(2)
    .max(100)
    .messages({
      "string.min": "Author name must be at least 2 characters",
      "string.max": "Author name cannot exceed 100 characters",
    }),
  price: Joi.number()
    .min(0)
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
    }),
  category: Joi.string(),
  publisher: Joi.string(),
  isbn: Joi.string(),
  stock: Joi.number()
    .min(0)
    .messages({
      "number.min": "Stock cannot be negative",
    }),
}).min(1); // At least one field is required

