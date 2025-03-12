import express from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  getSnippets,
  getSnippetById,
  createSnippet,
  deleteSnippet,
} from "../controllers/snippetController";
import { validateSnippet } from "../middleware/validateSnippet";
import { validationResult } from "express-validator";

const router = express.Router();

// Middleware to check validation errors
const handleValidationErrors = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ status: "error", errors: errors.array() });
    return;
  }
  next();
};

// Routes
router.get("/", asyncHandler(getSnippets));
router.get("/:id", asyncHandler(getSnippetById));
router.post(
  "/",
  validateSnippet,
  handleValidationErrors,
  asyncHandler(createSnippet)
);
router.delete("/:id", asyncHandler(deleteSnippet));

export default router;
