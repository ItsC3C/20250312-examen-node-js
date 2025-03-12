import { Request, Response } from "express";
import Snippet from "../models/Snippet";

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const { language, tags, search } = req.query;

    let query: any = {};
    if (language)
      query.language = { $regex: new RegExp(language as string, "i") };
    if (tags) query.tags = { $in: (tags as string).split(",") };
    if (search) query.title = { $regex: new RegExp(search as string, "i") };

    const snippets = await Snippet.find(query);

    res.status(200).json({ status: "success", data: snippets });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    res.status(200).json({ status: "success", data: snippet });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const createSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = new Snippet(req.body);
    await snippet.save();

    res.status(201).json({ status: "success", data: snippet });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const deleteSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    res
      .status(200)
      .json({ status: "success", message: "Snippet deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
