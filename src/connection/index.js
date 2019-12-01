const mysql = require('mysql')

const conn = mysql.createConnection({
    user: 'devuser',
    password: 'sendiri',
    host: 'localhost',
    database: 'catering_pa',
    port: 3306
})

module.exports = conn