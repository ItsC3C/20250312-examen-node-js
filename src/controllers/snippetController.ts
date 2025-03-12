import { Request, Response, NextFunction } from "express";
import Snippet from "../models/Snippet";

// Get all snippets with optional filtering
export const getSnippets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { language, tags, search } = req.query;

    let query: Record<string, any> = {};
    if (language)
      query.language = { $regex: new RegExp(language as string, "i") };
    if (tags) query.tags = { $in: (tags as string).split(",") };
    if (search) query.title = { $regex: new RegExp(search as string, "i") };

    const snippets = await Snippet.find(query);

    res.status(200).json({ status: "success", data: snippets });
  } catch (error) {
    next(error);
  }
};

// Get a single snippet by ID
export const getSnippetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    res.status(200).json({ status: "success", data: snippet });
  } catch (error) {
    next(error);
  }
};

// Create a new snippet
export const createSnippet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const snippet = new Snippet(req.body);
    await snippet.save();

    res.status(201).json({ status: "success", data: snippet });
  } catch (error) {
    next(error);
  }
};

// Delete a snippet by ID
export const deleteSnippet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    res
      .status(200)
      .json({ status: "success", message: "Snippet deleted successfully" });
  } catch (error) {
    next(error);
  }
};
