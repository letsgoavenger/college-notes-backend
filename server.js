const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// home
app.get("/", (req, res) => {
  res.send("Backend running");
});

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/admin", require("./routes/admin"));
app.use("/files", require("./routes/files"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
