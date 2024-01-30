const mysql = require('mysql2/promise');

function getConn(){
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '742369',
        database: 'presupuesto-familiar'
    });
    
    return conn;
}


module.exports = { getConn };