
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
);

db.connect(err => {
    if (err) throw err;
    console.log('Connected to employee database.');

});

module.exports = db;