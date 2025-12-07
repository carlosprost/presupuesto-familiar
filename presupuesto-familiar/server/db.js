const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, 'presupuesto.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ingreso (
    id_ingreso INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_ingreso TEXT NOT NULL,
    concepto TEXT NOT NULL,
    monto_ingreso REAL NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS egreso (
    id_egreso INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_egreso TEXT NOT NULL,
    concepto TEXT NOT NULL,
    monto_egreso REAL NOT NULL
  )`);
});

module.exports = db;
