const Database = require("better-sqlite3");

// قراءة مسار قاعدة البيانات من Environment
const dbPath = process.env.DB_PATH || "./cashbox.db";

// إنشاء الاتصال بقاعدة البيانات
const db = new Database(dbPath);

// إنشاء جدول المستخدمين إذا لم يكن موجودًا
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();

module.exports = db;
