const express = require("express");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const {
  getAuthTokenFromRequest,
  getJwtSecret,
} = require("../utils/authSecurity");
const { isTokenBlacklisted } = require("../utils/tokenBlacklist");

const router = express.Router();
const documentsRoot = path.resolve(__dirname, "../uploads/documents");
const JWT_SECRET = getJwtSecret();

const PUBLIC_PATHS = new Set([
  "departments",
  "academics",
  "research",
  "institution",
]);
const PROTECTED_PATHS = new Set(["admin-office", "internal", "private"]);

const normalizeFirstPathSegment = (requestedPath = "") =>
  String(requestedPath || "")
    .split("/")
    .find(Boolean)
    ?.trim()
    .toLowerCase() || "";

const ensureProtectedPathAccess = (req, res, requestedPath = "") => {
  const firstSegment = normalizeFirstPathSegment(requestedPath);
  const isProtected = PROTECTED_PATHS.has(firstSegment);
  const isPublic = PUBLIC_PATHS.has(firstSegment);

  if (!isProtected || isPublic) {
    return true;
  }

  const token = getAuthTokenFromRequest(req);
  if (!token) {
    res.status(401).json({ error: "Authentication required." });
    return false;
  }

  if (isTokenBlacklisted(token)) {
    res.status(401).json({ error: "Session expired. Please log in again." });
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (_error) {
    res.status(403).json({ error: "Invalid or expired token." });
    return false;
  }
};

const resolveDocumentPath = (unsafeRelativePath = "") => {
  const normalized = String(unsafeRelativePath || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");
  const resolvedPath = path.resolve(documentsRoot, normalized);

  if (!resolvedPath.startsWith(documentsRoot)) {
    return null;
  }

  return resolvedPath;
};

// Serve document by filename (supports nested paths like institution/administration/file.pdf)
router.get("/download/*", (req, res) => {
  try {
    const filename = req.params[0];

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    if (!ensureProtectedPathAccess(req, res, filename)) {
      return;
    }

    const filePath = resolveDocumentPath(filename);
    if (!filePath) {
      return res.status(400).json({ error: "Invalid document path" });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Document not found" });
    }

    const extension = path.extname(filePath).toLowerCase();
    const isPdf = extension === ".pdf";
    res.setHeader(
      "Content-Type",
      isPdf ? "application/pdf" : "application/octet-stream",
    );
    res.setHeader(
      "Content-Disposition",
      `${isPdf ? "inline" : "attachment"}; filename="${encodeURIComponent(
        path.basename(filePath),
      )}"`,
    );

    res.sendFile(filePath);
  } catch (error) {
    console.error("Document download error:", error);
    res.status(500).json({ error: "Failed to download document" });
  }
});

// List documents in a category
router.get("/list/*", (req, res) => {
  try {
    const category = req.params[0] || "";

    if (!ensureProtectedPathAccess(req, res, category)) {
      return;
    }

    const dirPath = resolveDocumentPath(category);
    if (!dirPath) {
      return res.status(400).json({ error: "Invalid category path" });
    }

    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: "Category not found" });
    }

    const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".pdf"));
    res.json({ files, category });
  } catch (error) {
    console.error("List documents error:", error);
    res.status(500).json({ error: "Failed to list documents" });
  }
});

// Serve structured documents by nested path.
router.get("/*", (req, res) => {
  try {
    const requestedPath = req.params[0] || "";
    if (!ensureProtectedPathAccess(req, res, requestedPath)) {
      return;
    }

    const filePath = resolveDocumentPath(requestedPath);
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Document not found." });
    }

    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return res.status(400).json({ error: "Requested path is not a file." });
    }

    return res.sendFile(filePath);
  } catch (error) {
    console.error("Structured document route error:", error);
    return res.status(500).json({ error: "Failed to serve document." });
  }
});

module.exports = router;
