const express = require("express");
const router = express.Router();
const { dataValida } = require('../utils')
const connection = require("../config/db");

const plataformasAceitas = [
    'Super Nintendo',
    'Mega Drive',
    'Atari',
    'PlayStation 5',
    'Xbox Series X',
    'Nintendo Switch',
    'PC',
    'PlayStation 4'
]


router.get("/", (req, res) => {
    console.log("Tipo de connection.query:", typeof connection.query);
    connection.query("SELECT * FROM jogos;", (err, results) => {
        if (err) {
            res.status(500).send("Erro ao buscar jogos");
            console.error("Erro:", err);
            return;
        }
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { nome, plataforma, anoLancamento } = req.body;

    let error = "";
    error = validarDados(plataforma, anoLancamento);

    if (error != "") {
        return res.status(400).send(error);
    }

    const sql = "INSERT INTO jogos (nome, plataforma, ano_lancamento) VALUES (?, ?, ?)";
    connection.query(sql, [nome, plataforma, anoLancamento], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao criar um jogo");
            return;
        }
        res.status(201).send("Jogo criado com sucesso");
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, plataforma, anoLancamento } = req.body;

    let error = "";
    error = validarDados(plataforma, anoLancamento);

    if (error != "") {
        return res.status(400).send(error);
    }

    const sql = "UPDATE jogos SET nome = ?, plataforma = ? anoLancamento = ? WHERE id = ?";
    connection.query(sql, [nome, plataforma, anoLancamento, id], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao atualizar o jogo");
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send("Jogo não encontrado");
        } else {
            res.send("Jogo atualizado com sucesso");
        }
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM jogos WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao deletar o jogo");
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send("Jogo não encontrado");
        } else {
            res.send("Jogo deletado com sucesso");
        }
    });
});



function validarDados(plataforma, data) {
    if (!plataformasAceitas.includes(plataforma)) {
        return "Plataforma inválida. Escolha uma plataforma válida.";
    }

    if (!dataValida(data)) {
        return "Data inválida.";
    }
}

module.exports = router;