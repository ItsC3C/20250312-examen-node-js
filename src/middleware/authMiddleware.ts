import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorized - No token provided" });
    }
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "Server error: No JWT_SECRET" });
    }
    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (!decoded) {
      return res.status(403).json({ message: "Unauthorized - Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("AuthMiddleware Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
