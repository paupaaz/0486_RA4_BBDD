// exemple-complet.js (a l'arrel de projecte-biblioteca)
const { crearConnexio, tancarConnexio } = require('./utils/db');
async function exempleComplet() {
    let connection;
    try {
        // 1. ESTABLIR I VERIFICAR LA CONNEXIÓ (seccions 6.3 i 4.1)
        connection = await crearConnexio();
        await connection.ping();
        console.log('✓ Connexió verificada\n');
        // 2. INSERIR UN LLIBRE AMB UNA CONSULTA PARAMETRITZADA
        // Cada ? es substitueix pel valor corresponent de l'array
        const [result] = await connection.execute(
        'INSERT INTO llibres (titol, autor, any_publicacio) VALUES (?, ?, ?)',
        ['Incerta glòria', 'Joan Sales', 1956]
        );
        console.log('Llibre inserit amb id:', result.insertId);
        // 3. RECUPERAR AQUEST LLIBRE PEL SEU id
        const [files] = await connection.execute(
        'SELECT titol, autor FROM llibres WHERE id = ?',
        [result.insertId]
        );
        console.log(`Llibre recuperat: ${files[0].titol} - ${files[0].autor}\n`);
        // 4. LLISTAR TOTS ELS LLIBRES ORDENATS PER ANY
        const [llibres] = await connection.execute(
        'SELECT id, titol, autor, any_publicacio ' +
        'FROM llibres ORDER BY any_publicacio'
        );
        console.log(`${llibres.length} llibres a la base de dades:`);
        for (const { any_publicacio, titol, autor } of llibres) {
        console.log(` ${any_publicacio} · ${titol} (${autor})`);
        }
        console.log('\n✓ Tot correcte!');
    } catch (error) {
        console.error('\n✗ Error:', error.code, '-', error.message);
        console.error('Vegeu la secció 5.1 i la taula d\'errors del T0 (secció 11)');
    } finally {
        await tancarConnexio(connection);
    }
}
exempleComplet();