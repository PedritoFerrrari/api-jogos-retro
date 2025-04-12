const express = require("express");
const router = express.Router();
const connection = require("../config/db");

router.get("/", (_, res) => {
    connection.query("SELECT * FROM players;", (err, results) => {
        if (err) {
            res.status(500).send("Erro ao buscar jogadores");
            return;
        }
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { nome, nickname } = req.body;

    let error = validarDados(nome, nickname);

    if (error != "") {
        return res.status(400).send(error);
    }

    let sql = "SELECT * FROM players where nickname = ?;"
    connection.query(sql, [nickname], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao buscar o jogador");
        }
        if (results.length > 0) {
            return res.status(404).send("Este nickname ja está sendo utilizado!");
        }
    });

    sql = "INSERT INTO players (nome, nickname) VALUES (?, ?)";
    connection.query(sql, [nome, nickname], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao criar um jogador");
            return;
        }
        res.status(200).send("Jogador criado com sucesso!");
    });
});


function validarDados(nome, nickname) {
    if (!nome || !nickname) {
        return "Todos os campos são obrigatórios!"
    }

    return "";
}

module.exports = router;