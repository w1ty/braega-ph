// db.js

import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

// تحميل متغيرات البيئة من ملف .env


// إنشاء الاتصال بقاعدة البيانات عبر متغيرات البيئة
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error("خطأ في الاتصال بقاعدة البيانات: " + err.stack);
        return;
    }
    console.log("تم الاتصال بقاعدة البيانات بنجاح!");
});

export default db;