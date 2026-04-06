const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'pixstar_hosting'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected for ThePixStar Hosting!');
});

// --- ROUTES ---

// 1. User Signup (Default 1GB RAM)
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password, plan_type) VALUES (?, ?, ?, 'free')";
    
    db.query(sql, [username, email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "User Registered! 1GB Server Allotted." });
    });
});

// 2. Admin Login (Fixed Password: qwertyui)
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === "qwertyui") {
        res.send({ success: true, message: "Welcome Admin!", redirect: "/admin-dashboard" });
    } else {
        res.status(401).send({ success: false, message: "Wrong Admin Password!" });
    }
});

// 3. Get User Server Info
app.get('/api/server/:userId', (req, res) => {
    const sql = "SELECT * FROM servers WHERE user_id = ?";
    db.query(sql, [req.params.userId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
