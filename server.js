require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// --- Config ---
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use("/api/auth", require("./routes/auth"));
app.use("/api/box", require("./routes/box"));
app.use("/api/transaction", require("./routes/transaction"));
app.use("/api/closure", require("./routes/closure"));

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("CashBox Secure Backend Running");
});

// --- Database + Server Start ---
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
