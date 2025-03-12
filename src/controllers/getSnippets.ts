import { Request, Response } from "express";
import { Snippet } from "../models/Snippet";
import { SortOrder } from "mongoose";

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const {
      language,
      tags,
      page = "1",
      limit = "10",
      sort = "createdAt",
      order = "desc",
    } = req.query;

    // Filter object
    const filter: any = {};

    if (language) {
      filter.language = { $regex: new RegExp(language as string, "i") };
    }

    if (tags) {
      const tagsArray = (tags as string)
        .split(",")
        .map((tag) => new RegExp(tag, "i"));
      filter.tags = { $all: tagsArray };
    }

    // Paginering
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sortering (Fix toegepast!)
    const sortOrder: SortOrder = order === "asc" ? 1 : -1;
    const sortOptions: Record<string, SortOrder> = {
      [sort as string]: sortOrder,
    };

    // Zoek query uitvoeren
    const snippets = await Snippet.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalSnippets = await Snippet.countDocuments(filter);

    res.status(200).json({
      status: "success",
      data: snippets,
      pagination: {
        total: totalSnippets,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalSnippets / pageSize),
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
