import express from "express";
import {
  createUrl,
  deleteUrl,
  getAllUrl,
  getUrl,
  validateUrl,
} from "../controllers/shortUrl";

const router = express.Router();

// Create short URL with validation
router.post("/shorturl", validateUrl, createUrl);

// Get all URLs
router.get("/shortUrl", getAllUrl);

// Get specific URL (for redirect)
router.get("/shortUrl/:id", getUrl);

// Delete URL
router.delete("/shortUrl/:id", deleteUrl);

export default router;
