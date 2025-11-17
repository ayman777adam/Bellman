const Database = require("better-sqlite3");
const path = require("path");

const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "cashbox.db");

// فتح / إنشاء ملف القاعدة
const db = new Database(dbPath);

// إنشاء الجداول الأساسية إذا لم تكن موجودة
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS cashbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    items TEXT,
    totals TEXT,
    userId INTEGER
  )
`).run();

module.exports = db;
