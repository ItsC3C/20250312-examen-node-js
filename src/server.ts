// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import connectToDb from "./config/db";
import snippetRoutes from "./routes/snippetRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import dashboardRoutes from "./routes/dashboardRoutes";

// Variables
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join("src", "views"));
app.use(express.static(path.join("src", "public")));

// Routes
app.use("/api/snippets", snippetRoutes);
app.use("/", dashboardRoutes);

// Global error handler
app.use(errorMiddleware);

// Server Listening
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  await connectToDb();
});
