require("dotenv").config();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// تسجيل مستخدم جديد
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashed);

    return res.json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
