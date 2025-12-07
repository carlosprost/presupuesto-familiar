const db = require('./db');

function fechaActual(){
    let date = new Date();
    let fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return fecha;
}

function getIngresos() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM ingreso", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function addIngresos(ingreso) {
    return new Promise((resolve, reject) => {
        const date = fechaActual();
        const sql = `INSERT INTO ingreso (fecha_ingreso, concepto, monto_ingreso) VALUES (?, ?, ?)`;
        db.run(sql, [date, ingreso.concepto, ingreso.monto_ingreso], function(err) {
            if (err) reject(err);
            else {
                // Return all incomes to update the list, similar to original behavior
                getIngresos().then(resolve).catch(reject);
            }
        });
    });
}

function deleteIngresos(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM ingreso WHERE id_ingreso = ?`;
        db.run(sql, [id], function(err) {
            if (err) reject(err);
            else resolve(id);
        });
    });
}

function updateIngresos(ingreso) {
    return new Promise((resolve, reject) => {
        // Construct dynamic query
        let fields = [];
        let values = [];
        if (ingreso.fecha_ingreso) { fields.push("fecha_ingreso = ?"); values.push(ingreso.fecha_ingreso); }
        if (ingreso.concepto) { fields.push("concepto = ?"); values.push(ingreso.concepto); }
        if (ingreso.monto_ingreso) { fields.push("monto_ingreso = ?"); values.push(ingreso.monto_ingreso); }
        
        if (fields.length === 0) {
             resolve(ingreso); 
             return;
        }

        values.push(ingreso.id_ingreso);
        const sql = `UPDATE ingreso SET ${fields.join(", ")} WHERE id_ingreso = ?`;

        db.run(sql, values, function(err) {
            if (err) reject(err);
            else resolve(ingreso);
        });
    });
}

// Egresos
function getEgresos() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM egreso", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function addEgresos(egreso) {
    return new Promise((resolve, reject) => {
        const date = fechaActual();
        const sql = `INSERT INTO egreso (fecha_egreso, concepto, monto_egreso, tipo) VALUES (?, ?, ?, ?)`;
        // Default to 'Necesario' if not provided
        const tipo = egreso.tipo || 'Necesario';
        db.run(sql, [date, egreso.concepto, egreso.monto_egreso, tipo], function(err) {
            if (err) reject(err);
            else {
                getEgresos().then(resolve).catch(reject);
            }
        });
    });
}

function deleteEgresos(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM egreso WHERE id_egreso = ?`;
        db.run(sql, [id], function(err) {
            if (err) reject(err);
            else resolve(id);
        });
    });
}

function updateEgresos(egreso) {
    return new Promise((resolve, reject) => {
        let fields = [];
        let values = [];
        if (egreso.fecha_egreso) { fields.push("fecha_egreso = ?"); values.push(egreso.fecha_egreso); }
        if (egreso.concepto) { fields.push("concepto = ?"); values.push(egreso.concepto); }
        if (egreso.monto_egreso) { fields.push("monto_egreso = ?"); values.push(egreso.monto_egreso); }
        if (egreso.tipo) { fields.push("tipo = ?"); values.push(egreso.tipo); }
        
        if (fields.length === 0) {
            resolve(egreso);
            return;
        }

        values.push(egreso.id_egreso);
        const sql = `UPDATE egreso SET ${fields.join(", ")} WHERE id_egreso = ?`;
        db.run(sql, values, function(err) {
            if (err) reject(err);
            else resolve(egreso);
        });
    });
}

module.exports = {
    getIngresos,
    addIngresos,
    deleteIngresos,
    updateIngresos,
    getEgresos,
    addEgresos,
    deleteEgresos,
    updateEgresos,
    // Config
    getConfig: () => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM configuracion WHERE id = 1", (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    updateConfig: (config) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE configuracion SET tipo_empleo = ?, cobra_desempleo = ?, meses_aguinaldo = ? WHERE id = 1`;
            db.run(sql, [config.tipo_empleo, config.cobra_desempleo, config.meses_aguinaldo], (err) => {
                if (err) reject(err);
                else resolve(config);
            });
        });
    }
};
