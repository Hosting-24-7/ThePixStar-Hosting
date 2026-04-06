const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// .env file se details load karne ke liye
dotenv.config();

const app = express();

// --- MIDDLEWARE ---

// 1. Helmet Fix: Isse inline scripts block nahi hongi (ThePixStar Special Fix)
app.use(helmet({
    contentSecurityPolicy: false,
}));

// 2. CORS: Taaki frontend aur backend bina kisi error ke baat kar sakein
app.use(cors());

// 3. JSON Parser: Taaki signup ka data server samajh sake
app.use(express.json());

// 4. STATIC FILES: Frontend folder ki HTML/JS files ko browser mein dikhane ke liye
// Hum 'path' module use kar rahe hain taaki Linux/Windows dono par chale
app.use(express.static(path.join(__dirname, '../Frontend')));

// --- DATABASE CONNECTION ---

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'pixstar_hosting', // Aapka DB naam
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database Connection Error: ' + err.message);
        return;
    }
    console.log('✅ MySQL Connected! ThePixStar Hosting is Ready.');
});

// --- API ROUTES ---

// Health Check: Browser preview check karne ke liye
app.get('/status', (req, res) => {
    res.json({ status: "✅ Server Running", timestamp: new Date() });
});

// SIGNUP API: User register karne aur Pterodactyl server request bhejne ke liye
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Bhai, saari details bharna zaroori hai!" });
    }

    const sql = "INSERT INTO users (username, email, password, plan_type) VALUES (?, ?, ?, 'free')";
    
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database mein error hai: " + err.message });
        }
        
        // Yahan future mein hum Pterodactyl API call add karenge
        console.log(`New User Registered: ${username}`);
        res.status(200).json({ message: "User Registered Successfully! 1GB Server Allotted." });
    });
});

// --- START SERVER ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server up and running on port ${PORT}`);
    console.log(`🔗 Preview link: http://localhost:${PORT}/signup.html`);
});
