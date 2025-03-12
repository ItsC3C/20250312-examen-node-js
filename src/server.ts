import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./config/db";
import snippetRoutes from "./routes/snippetRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectToDb();

// API Routes
app.use("/api/snippets", snippetRoutes);

// Global Error Handler
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
