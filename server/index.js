import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const employees = JSON.parse(fs.readFileSync(path.resolve('src/data/employees.json'), 'utf-8'));
const logins = JSON.parse(fs.readFileSync(path.resolve('src/data/logins.json'), 'utf-8'));

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.get('/api/logins', (req, res) => {
  res.json(logins);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});