const { getConn } = require('./db');

//Ingresos
async function getIngresos() {
    let resultado;
    try {
        const conn = await getConn();
        resultado = await conn.query(`SELECT * FROM ingreso`);
        conn.end()
    } catch (error) {
        resultado = {}
        console.log(error)
    }
    return resultado;
}

async function addIngresos(ingreso){
    let resultado;
    let date = fechaActual()
    try {
        const conn = await getConn();
        await conn.query(`INSERT INTO ingreso (fecha_ingreso, concepto, monto_ingreso) VALUES ('${date}', '${ingreso.concepto}', ${ingreso.monto_ingreso})`);
        resultado = getIngresos();
        conn.end()
    } catch (error) {
        resultado = false;
        console.log(error)
    }
    return resultado;
}

async function deleteIngresos(id){
    let resultado;
    try {
        const conn = await getConn();
        await conn.query(`DELETE FROM ingreso WHERE id_ingreso = ${id}`);
        resultado = id;
        conn.end()
    } catch (error) {
        resultado = false;
        console.log(error)
    }
    return resultado;
}

async function updateIngresos(ingreso){
    let resultado;
    try {
        const conn = await getConn();
        console.log(ingreso);
        await conn.query(`UPDATE ingreso SET ${ingreso.fecha_ingreso ? 'fecha_ingreso = '+ ingreso.fecha_ingreso + ',' : ''} ${ingreso.concepto ? 'concepto = '+ ingreso.concepto + ',' : ''} ${ingreso.monto_ingreso ? 'monto_ingreso = '+ ingreso.monto_ingreso : ''}  WHERE id_ingreso = ${ingreso.id_ingreso}`);
        resultado = ingreso;
        conn.end()
    } catch (error) {
        resultado = false;
        console.log(error)
    }
    return resultado;

}


//Egresos
async function getEgresos() {
    let resultado;
    try {
        const conn = await getConn();
        resultado = await conn.query(`SELECT * FROM egreso`);
        conn.end()
    } catch (error) {
        resultado = {}
        console.log(error)
    }
    return resultado;
}

async function addEgresos(egreso){
    let resultado;
    let date = fechaActual()
    try {
        const conn = await getConn();
        await conn.query(`INSERT INTO egreso (fecha_egreso, concepto, monto_egreso) VALUES ('${date}', '${egreso.concepto}', ${egreso.monto_egreso})`);
        resultado = getEgresos();
        conn.end()
    } catch (error) {
        resultado = false;
        console.log(error)
    }
    return resultado;
}

async function deleteEgresos(id){
    let resultado;
    try {
        const conn = await getConn();
        await conn.query(`DELETE FROM egreso WHERE id_egreso = ${id}`);
        resultado = id;
        conn.end()
    } catch (error) {
        resultado = false;
        console.log(error)
    }
    return resultado;
}

async function updateEgresos(egreso){
    let resultado;
    try {
        const conn = await getConn();
        await conn.query(`UPDATE egreso SET ${egreso.fecha_egreso ? 'fecha_egreso = '+ egreso.fecha_egreso + ',' : ''} ${egreso.concepto ? 'concepto = '+ egreso.concepto + ',' : ''} ${egreso.monto_egreso ? 'monto_egreso = '+ egreso.monto_egreso : ''}  WHERE id_egreso = ${egreso.id_egreso}`);
        resultado = egreso;
        conn.end()
    } catch (error) {
        resultado = false;
        console.log(error)
    }
    return resultado;

}

function fechaActual(){
    let date = new Date();
    let fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return fecha;
}


module.exports = { 
    getIngresos,
    addIngresos,
    deleteIngresos,
    updateIngresos,
    fechaActual, 
    getEgresos,
    addEgresos,
    deleteEgresos,
    updateEgresos
};