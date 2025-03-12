import mongoose, { Schema, Document } from "mongoose";
import { ISnippet } from "../types/snippetTypes";

interface ISnippetDocument extends Omit<ISnippet, "id">, Document {}

const snippetSchema = new Schema<ISnippetDocument>(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tags: { type: [String], required: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Snippet = mongoose.model("Snippet", snippetSchema);
