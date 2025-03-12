import express from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  getSnippets,
  getSnippetById,
  createSnippet,
  deleteSnippet,
} from "../controllers/snippetController";

const router = express.Router();

router.get("/", asyncHandler(getSnippets));
router.get("/:id", asyncHandler(getSnippetById));
router.post("/", asyncHandler(createSnippet));
router.delete("/:id", asyncHandler(deleteSnippet));

export default router;
