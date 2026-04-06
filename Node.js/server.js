const express = require('express');
// Isse browser ko pata chalega ki HTML/CSS files kahan hain
app.use(express.static('Frontend'));
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
    password: process.env.DB_PASS || '',
    database: 'pixstar_hosting'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected for ThePixStar Hosting!');
});

// --- ROUTES ---

// 1. User Signup (Auto-allot 1GB)
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password, plan_type) VALUES (?, ?, ?, 'free')";
    
    db.query(sql, [username, email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "User Registered! 1GB Server Allotted." });
    });
});

// 2. Admin Upgrade Logic (Using qwertyui from .env)
app.post('/api/admin/upgrade', (req, res) => {
    const { adminPass, serverId, newRam } = req.body;

    if (adminPass === process.env.ADMIN_PASS) {
        // Yahan Pterodactyl API hit hogi RAM update ke liye
        res.send({ message: `Server ${serverId} upgraded to ${newRam}MB successfully!` });
    } else {
        res.status(401).send({ error: "Ghalat Admin Password!" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
