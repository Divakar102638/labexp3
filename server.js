const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('users.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
)`);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (like HTML)
app.use(express.static(__dirname));

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], (err) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.send('User data saved successfully!');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});