// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import connectToDb from "./config/db";
import snippetRoutes from "./routes/snippetRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

// Constants
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine and static files
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(express.static(path.resolve("src", "public")));

// Routes
app.use("/api/snippets", snippetRoutes);
app.use("/", dashboardRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
(async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
})();
