import "dotenv/config";

export const PORT = process.env.PORT || "3001";
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const NODE_ENV = process.env.NODE_ENV || "development";

if (!MONGO_URI || !JWT_SECRET) {
  throw new Error("❌ Missing environment variables: MONGO_URI or JWT_SECRET");
}
