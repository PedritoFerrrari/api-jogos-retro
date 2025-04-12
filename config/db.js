const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "asdf000",
    database: "jogos_retro",
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conectado ao banco de dados MySQL com sucesso!");
});

module.exports = connection;