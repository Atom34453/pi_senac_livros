const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo usuário do MySQL
    password: 'merxyx-tubvu2-nihNyr', // Substitua pela senha do MySQL
    database: 'sistema_livros'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = connection;
