import { body, ValidationChain } from "express-validator";

export const validateSnippet: ValidationChain[] = [
  body("title").notEmpty().withMessage("Title is required"),
  body("code").notEmpty().withMessage("Code is required"),
  body("language").notEmpty().withMessage("Language is required"),
  body("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array with at least one tag"),
  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("expiresAt must be a valid ISO 8601 date"),
];
