
const mysql = require('mysql2/promise');

// Funció per connectar amb la base de dades
async function connectarBD() {
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

        console.log('Connexió establerta amb èxit!');
        return connection;

    } catch (error) {
        console.error('Error connectant:', error.message);
        throw error;
    }
}

// Funció per fer una consulta de prova
async function exempleConsulta() {
    let connection;

    try {
        // Establim la connexió
        connection = await connectarBD();

        // Fem una consulta de prova
        const [rows] = await connection.execute(
            'SELECT 1 + 1 AS resultat'
        );

        console.log('Resultat:', rows[0].resultat);

    } catch (error) {
        console.error('Error:', error.message);

    } finally {
        // Tanquem la connexió
        if (connection) {
            await connection.end();
            console.log('Connexió tancada');
        }
    }
}

// Executem l'exemple
exempleConsulta();
