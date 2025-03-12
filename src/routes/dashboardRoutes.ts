import express from "express";
import { Snippet } from "../models/Snippet";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { language, tags } = req.query;

    let query: any = {};
    if (language) {
      query.language = { $regex: new RegExp(language as string, "i") };
    }

    if (tags) {
      query.tags = { $in: (tags as string).split(",") };
    }

    const snippets = await Snippet.find(query);

    res.render("dashboard", { snippets });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
});

export default router;
