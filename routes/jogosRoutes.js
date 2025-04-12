const express = require("express");
const router = express.Router();
const { validarData } = require('../utils')
const connection = require("../config/db");

const plataformasAceitas = [
    'Super Nintendo',
    'Mega Drive',
    'Atari',
    'PlayStation 5',
    'Xbox Series X',
    'Nintendo Switch',
    'PC',
    'PlayStation 4',
    'PSP'
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
    const { nome, plataforma, ano_lancamento } = req.body;

    let error = validarDados(plataforma, ano_lancamento);

    console.log(error != "");
    if (error != "") {
        return res.status(400).send(error);
    }

    const sql = "INSERT INTO jogos (nome, plataforma, ano_lancamento) VALUES (?, ?, ?)";
    connection.query(sql, [nome, plataforma, ano_lancamento], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao criar um jogo");
            return;
        }
        res.status(201).send("Jogo criado com sucesso");
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, plataforma, ano_lancamento } = req.body;

    let error = validarDados(plataforma, ano_lancamento);

    if (error != "") {
        return res.status(400).send(error);
    }

    const sql = "UPDATE jogos SET nome = ?, plataforma = ? ano_lancamento = ? WHERE id = ?";
    connection.query(sql, [nome, plataforma, ano_lancamento, id], (err, results) => {
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

    if (!validarData (data)) {
        return "Data inválida. Use o formato YYYY-MM-DD.";
    }

    return "";
}

module.exports = router;