import express from "express";
import { Snippet } from "../models/Snippet";

const router = express.Router();

// GET Dashboard with filters
router.get("/", async (req, res) => {
  try {
    const { language, tags } = req.query;

    // Build query object based on filters (ignoring "---")
    const query: Record<string, any> = {};
    if (language && language !== "---") {
      query.language = { $regex: new RegExp(language as string, "i") };
    }
    if (tags && tags !== "---") {
      query.tags = {
        $in: (tags as string).split(",").map((tag) => tag.trim()),
      };
    }

    // Fetch snippets based on the constructed query
    const snippets = await Snippet.find(query);

    // Fetch all snippets (ignoring filters) to build dropdown options
    const allSnippets = await Snippet.find({});
    const languages = Array.from(new Set(allSnippets.map((s) => s.language)));
    const allTags = Array.from(new Set(allSnippets.flatMap((s) => s.tags)));

    res.render("dashboard", {
      snippets,
      language: language || "",
      tags: tags || "",
      languages,
      allTags,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});

// GET New Snippet Form
router.get("/new", (_req, res) => {
  res.render("new");
});

// POST New Snippet
router.post("/new", async (req, res) => {
  try {
    const { title, code, language, tags } = req.body;

    // Split tags by comma and trim whitespace
    const tagsArray = tags
      ? tags.split(",").map((tag: string) => tag.trim())
      : [];

    // Create new snippet
    await Snippet.create({ title, code, language, tags: tagsArray });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});

export default router;
