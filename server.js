const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route (TOP pe hi)
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// home route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// static uploads
app.use("/uploads", express.static("uploads"));

// routes
app.use("/admin", require("./routes/admin"));
app.use("/files", require("./routes/files"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
