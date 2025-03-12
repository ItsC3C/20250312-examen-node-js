import express from "express";
import {
  createSnippet,
  getSnippets,
  deleteSnippet,
  getSnippetById,
  editSnippet,
} from "../controllers/snippetController.js";

const router = express.Router();
router.get("/", getSnippets);
router.get("/:id", getSnippetById);
router.put("/:id", editSnippet);
router.post("/", createSnippet);
router.delete("/:id", deleteSnippet);

export default router;
