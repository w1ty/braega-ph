
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import mysql from "mysql2";
import db from './db.js';

const employees = JSON.parse(
fs.readFileSync(path.resolve("src/data/employees.json"), "utf-8")
);
const logins = JSON.parse(
fs.readFileSync(path.resolve("src/data/logins.json"), "utf-8")
);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/employees", (req, res) => {
res.json(employees);
});

app.get("/api/logins", (req, res) => {
res.json(logins);
});

// app.js

app.post("/register", (req, res) => {
const { employee_number, password, role } = req.body;

const query =  
    "INSERT INTO users (employee_number, password, role) VALUES (?, ?, ?)";  
db.query(query, [employee_number, password, role], (err, result) => {  
    if (err) return res.status(500).send("خطأ في إدخال المستخدم.");  
    res.status(200).send("تم تسجيل المستخدم بنجاح!");  
});

});

// تسجيل الدخول والتحقق من المستخدم
app.post("/login", (req, res) => {
const { employee_number, password } = req.body;

const query = "SELECT * FROM users WHERE employee_number = ?";  
db.query(query, [employee_number], (err, results) => {  
    if (err) return res.status(500).send("خطأ في استعلام قاعدة البيانات.");  
    if (results.length === 0)  
        return res.status(404).send("المستخدم غير موجود.");  

    const user = results[0];  

    // مقارنة كلمة السر  
    if (user.password_hash !== password) {  
        return res.status(401).send("كلمة السر غير صحيحة.");  
    }  

    // تسجيل الدخول ناجح  
    res.status(200).send("تم تسجيل الدخول بنجاح!");  
});

});

// جلب جميع الإدارات
app.get("/api/administrations", (req, res) => {
const query = "SELECT * FROM administrations";
db.query(query, (err, results) => {
if (err) return res.status(500).send("خطأ في استعلام الإدارات.");
res.status(200).json(results);
});
});

// جلب الأقسام بناءً على إدارة معينة
app.get("/api/departments", (req, res) => {
const { administration_id } = req.query;
const query = "SELECT * FROM departments WHERE administration_id = ?";
db.query(query, [administration_id], (err, results) => {
if (err) return res.status(500).send("خطأ في استعلام الأقسام.");
res.status(200).json(results);
});
});

// جلب الموظفين حسب الفلاتر
app.get("/api/directory", (req, res) => {
const { administration_id, department_id, location_id, job_title_id } =
req.query;

let query = "SELECT * FROM directory WHERE 1=1";  
const params = [];  

if (administration_id) {  
    query += " AND administration_id = ?";  
    params.push(administration_id);  
}  
if (department_id) {  
    query += " AND department_id = ?";  
    params.push(department_id);  
}  
if (location_id) {  
    query += " AND location_id = ?";  
    params.push(location_id);  
}  
if (job_title_id) {  
    query += " AND job_title_id = ?";  
    params.push(job_title_id);  
}  

db.query(query, params, (err, results) => {  
    if (err) return res.status(500).send("خطأ في استعلام الموظفين.");  
    res.status(200).json(results);  
});

});

app.listen(PORT, () => {
console.log('Server is running on http://localhost:' + PORT);
});

