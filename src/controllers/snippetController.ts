import { Request, Response } from "express";
import { Snippet } from "../models/Snippet";
import mongoose from "mongoose";
// Get all snippets with optional filtering
export const getSnippets = async (req: Request, res: Response) => {
  try {
    const { language, tags, search } = req.query;

    let query: Record<string, any> = {};
    if (language)
      query.language = { $regex: new RegExp(language as string, "i") };
    if (tags) query.tags = { $in: (tags as string).split(",") };
    if (search) query.title = { $regex: new RegExp(search as string, "i") };

    const snippets = await Snippet.find(query);
    res.status(200).json({ status: "success", data: snippets });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

// Get a single snippet by ID
export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      res.status(404).json({ message: "Snippet not found" });
      return;
    }
    res.status(200).json({ status: "success", data: snippet });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

// Create a new snippet
export const createSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.create({ ...req.body });
    res.status(201).json({ status: "success", data: snippet });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

// Delete a snippet by ID
export const deleteSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSnippet = await Snippet.findByIdAndDelete(id);
    if (!deletedSnippet) {
      res.status(404).json({ message: "Snippet not found" });
      return;
    }
    res
      .status(200)
      .json({ status: "success", message: "Snippet deleted successfully" });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

// Update a snippet by ID
export const editSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Snippet.findByIdAndUpdate(id, { ...req.body });

    res.status(200).json({ status: "succes", data: updated });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
