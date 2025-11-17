require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// تأكد أن المسارات صحيحة
app.use(cors());
app.use(express.json());

// ربط مسارات auth
app.use("/api/auth", require("./routes/auth"));

// صفحة اختبار بسيطة
app.get("/", (req, res) => {
  res.send("CashBox Secure Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
