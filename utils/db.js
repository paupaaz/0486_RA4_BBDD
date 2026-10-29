


// utils/db.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');
/**
* Crea una nova connexió a la BD
*/
async function crearConnexio() {
try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✓ Connexió establerta');
    return connection;
    } catch (error) {
    console.error('✗ Error:', error.message);
    throw error;
    }
}
/**
* Tanca una connexió de forma segura
*/
async function tancarConnexio(connection) {
    if (connection) {
    await connection.end();
    console.log('✓ Connexió tancada');
    }
}
async function verificarConnexio(connection) {
try {
// ping() envia un paquet petit al servidor
    await connection.ping();
    return true;
    } catch (error) {
    return false;
    }
}

module.exports = {
crearConnexio,
tancarConnexio,
verificarConnexio
};