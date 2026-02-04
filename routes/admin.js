const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();

const ADMIN_PASSWORD = "admin123";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `uploads/${req.body.branch}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("pdf"), (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.status(401).send("Wrong admin password");
  }

  const path = require("path");
const filePath = path.join(__dirname, "..", "data", "files.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));


  data.push({
    branch: req.body.branch,
    semester: req.body.semester,
    subject: req.body.subject,
    type: req.body.type,
    filename: req.file.filename,
    views: 0
  });

  fs.writeFileSync("data/files.json", JSON.stringify(data, null, 2));
  res.send("File uploaded successfully");
});

module.exports = router;
