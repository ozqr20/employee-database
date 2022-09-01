const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'UCF2022MySQL!',
    database: 'employee'
    },
    console.log('Connected!')
);

module.exports = db;