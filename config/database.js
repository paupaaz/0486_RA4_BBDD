const config = {
host: '127.0.0.1', // El teu ordinador (millor que 'localhost')
port: 3306, // Port publicat pel contenidor
user: 'nodeuser', // Usuari creat al T0 (accepta connexions de '%')
password: 'nodepass', // Contrasenya definida al T0
database: 'biblioteca', // Base de dades creada al T0
timezone: 'Z', // El servidor treballa en hora UTC
dateStrings: ['DATE'] // Les columnes DATE arriben com a 'AAAA-MM-DD'
};

module.exports = config;

