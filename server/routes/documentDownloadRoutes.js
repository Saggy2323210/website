const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/download/*", (req, res) => {
  try {
    const filename = req.params[0];

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const safePath = path.normalize(filename).replace(/^(\.\.(\/|\\))+/, "");
    const filePath = path.join(__dirname, "../uploads/documents", safePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${path.basename(filePath)}"`,
    );

    res.sendFile(filePath);
  } catch (error) {
    console.error("Document download error:", error);
    res.status(500).json({ error: "Failed to download document" });
  }
});

router.get("/list/*", (req, res) => {
  try {
    const category = req.params[0] || "";
    const dirPath = path.join(__dirname, "../uploads/documents", category);

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

module.exports = router;
