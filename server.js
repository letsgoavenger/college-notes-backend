const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// TEMP: only files API (no uploads)
app.get("/files", (req, res) => {
  res.json([]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
