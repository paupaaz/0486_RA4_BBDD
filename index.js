// index.js
const { crearConnexio, tancarConnexio } = require('./utils/db');
async function main() {
    let connection;
    try {
        console.log('Iniciant aplicació...\n');
        // Crear connexió
        connection = await crearConnexio();
        // Consulta de prova
        const [info] = await connection.execute(`
        SELECT
        VERSION() AS versio,
        DATABASE() AS bd_actual,
        NOW() AS data_hora
        `);
        console.log('Informació del servidor:');
        console.log(` Versió MySQL: ${info[0].versio}`);
        console.log(` Base de dades: ${info[0].bd_actual}`);
        console.log(` Data/Hora: ${info[0].data_hora.toLocaleString('ca-ES')}`);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await tancarConnexio(connection);
        console.log('\nFinalitzat');
    }
}
main().catch(console.error);