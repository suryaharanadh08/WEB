const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your database username
    password: 'M1racle@123',  // Replace with your database password
    database: 'testdb'  // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { username, email } = req.body;
    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';

    db.query(query, [username, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Server Error');
            return;
        }
        res.send('Data successfully submitted!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
