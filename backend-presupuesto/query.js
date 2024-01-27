const { getConn } = require('./db');

//Ingresos
function getIngresos() {
    let resultado;
    try {
        const conn = getConn();
        resultado = conn.query(`SELECT * FROM ingreso`);
        conn.end()
    } catch (error) {
        console.log(error)
    }
    return resultado;
}

function addIngresos(ingreso){
    let resultado;
    let date = new Date();
    try {
        const conn = getConn();
        resultado = conn.query(`INSERT INTO ingreso (fecha_ingreso, concepto, monto_ingreso) VALUES ('${ingreso.fecha_ingreso}', '${ingreso.concepto}', '${ingreso.monto_ingreso}')`);
        conn.end()
    } catch (error) {
        console.log(error)
    }
    return resultado;
}

function deleteIngresos(id){
    let resultado;
    try {
        const conn = getConn();
        resultado = conn.query(`DELETE FROM ingreso WHERE id_ingreso = ${id}`);
        conn.end()
    } catch (error) {
        console.log(error)
    }
    return resultado;
}

function updateIngresos(ingreso){
    let resultado;
    try {
        const conn = getConn();
        resultado = conn.query(`UPDATE ingreso SET fecha_ingreso = '${ingreso.fecha_ingreso}', concepto = '${ingreso.concepto}', monto_ingreso = '${ingreso.monto_ingreso}' WHERE id_ingreso = ${ingreso.id_ingreso}`);
        conn.end()
    } catch (error) {
        console.log(error)
    }
    return resultado;

}


//Egresos
function getEgresos() {
    let resultado;
    try {
        const conn = getConn();
        resultado = conn.query(`SELECT * FROM egreso`);
        conn.end()
    } catch (error) {
        console.log(error)
    }
    return resultado;
}


module.exports = { 
    getIngresos,
    addIngresos,
    deleteIngresos,
    updateIngresos, 
    getEgresos 
};