const mysql = require('mysql2/promise');

async function gestioErrors() {
try {
    const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'nodeuser',
    password: 'nodepass',
    database: 'biblioteca',
    timezone: 'Z',
    dateStrings: ['DATE']
    });
    console.log('✓ Connexió correcta');
    await connection.end();
    } catch (error) {
    // Analitzem el codi d'error
    switch (error.code) {
        case 'ER_BAD_DB_ERROR':
        console.error('La base de dades no existeix');
        console.error('Solució: Crea "biblioteca" seguint el T0 (secció 4.3)');
        break;
        case 'ER_ACCESS_DENIED_ERROR':
        console.error('Usuari o contrasenya incorrectes');
        console.error('Solució: Verifica user: "nodeuser" i password: "nodepass"');
        break;
        case 'ER_HOST_NOT_PRIVILEGED':
        console.error('Aquest usuari no es pot connectar des de fora del contenidor');
        console.error('Solució: Fes servir "nodeuser", no "root"');
        break;
        case 'ECONNREFUSED':
        console.error('No hi ha res escoltant: contenidor aturat o port incorrecte');
        console.error('Solució: docker start xampp_container i revisa el port');
        break;
        case 'ENOTFOUND':
        console.error('El nom del host no existeix (potser està mal escrit)');
        console.error('Solució: Revisa el valor de host: "127.0.0.1"');
        break;
        default:
        console.error('Error:', error.message);
        }
    }
}
// Executem l'exemple
gestioErrors();
