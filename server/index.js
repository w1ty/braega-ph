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

//

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
        if (err) return res.status(500).send("Database query error.");
        if (results.length === 0) return res.status(404).send("User not found.");

        const user = results[0];

        // Compare the provided password directly with the stored password
        if (user.password !== password) {
            return res.status(401).send("Incorrect password.");
        }

        // Successful login
        res.status(200).send({ message: "Login successful!", role: user.role });
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
    const { administration_id, department_id, location_id, job_title_id, search } = req.query;

    let query = `
        SELECT d.*, 
               l.name AS location_name, 
               jt.title AS role_name, 
               dep.name AS department_name, 
               adm.name AS administration_name 
        FROM directory d
        LEFT JOIN locations l ON d.location_id = l.id
        LEFT JOIN job_titles jt ON d.job_title_id = jt.id
        LEFT JOIN departments dep ON d.department_id = dep.id
        LEFT JOIN administrations adm ON dep.administration_id = adm.id
        WHERE 1=1`;

    const params = [];

    if (administration_id) {
        query += " AND adm.id = ?";
        params.push(administration_id);
    }
    if (department_id) {
        query += " AND dep.id = ?";
        params.push(department_id);
    }
    if (location_id) {
        query += " AND l.id = ?";
        params.push(location_id);
    }
    if (job_title_id) {
        query += " AND jt.id = ?";
        params.push(job_title_id);
    }
    if (search) {
        query += " AND (d.name LIKE ? OR d.internal_number LIKE ? OR d.external_number LIKE ? OR d.voip_number LIKE ?)";
        const searchParam = `%${search}%`;
        params.push(searchParam, searchParam, searchParam, searchParam);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).send("خطأ في استعلام الموظفين.");
        res.status(200).json(results);
    });
});

// Add endpoint to fetch login data
app.get("/api/logins", (req, res) => {
    const query = "SELECT employee_number, password, role FROM users";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send("Error fetching login data.");
        res.status(200).json(results);
    });
});

// Add endpoint to fetch all locations, roles, departments, and administrations
app.get("/api/metadata", (req, res) => {
    const queries = {
        locations: "SELECT id, name FROM locations",
        roles: "SELECT id, title FROM job_titles",
        departments: "SELECT id, name, administration_id FROM departments",
        administrations: "SELECT id, name FROM administrations"
    };

    const results = {};
    let completed = 0;

    Object.keys(queries).forEach((key) => {
        db.query(queries[key], (err, data) => {
            if (err) {
                return res.status(500).send(`Error fetching ${key}`);
            }

            results[key] = data;
            completed++;

            if (completed === Object.keys(queries).length) {
                res.status(200).json(results);
            }
        });
    });
});

// Add endpoint to delete an employee
app.delete("/api/employees/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM directory WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send("Error deleting employee.");
        if (result.affectedRows === 0) return res.status(404).send("Employee not found.");

        res.status(200).send("Employee deleted successfully.");
    });
});

app.listen(PORT, () => {
console.log('Server is running on http://localhost:' + PORT);
});

