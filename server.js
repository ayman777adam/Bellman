require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose'); 

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسار تسجيل الدخول وإنشاء الحساب
app.use("/api/auth", require("./routes/auth"));
app.use("/api/box", require("./routes/box")); 
app.use("/api/transaction", require("./routes/transaction")); // <-- السطر المضاف لتسجيل مسار المعاملات
// ... داخل ملف server.js
app.use("/api/transaction", require("./routes/transaction")); 
// 🔥 إضافة المسار الجديد لتقارير الإغلاق 🔥
app.use("/api/closure", require("./routes/closure")); // <-- السطر المُضاف

app.get("/", (req, res) => {
// ... باقي الكود
app.get("/", (req, res) => {
  res.send("CashBox Secure Backend Running");
});

// --- كود الاتصال (يبقى كما هو) ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });