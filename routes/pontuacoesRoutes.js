const express = require("express");
const router = express.Router();
const { validarData } = require('../utils')
const connection = require("../config/db");

router.get("/ranking/:idJogo", (req, res) => {
    const { idJogo } = req.params;

    const checkSql = "SELECT * FROM jogos WHERE id = ?";
    connection.query(checkSql, [idJogo], (err, jogoResults) => {
        if (err) {
            return res.status(500).send("Erro ao buscar o jogo.");
        }

        if (jogoResults.length === 0) {
            return res.status(404).send("Jogo não encontrado.");
        }

        const rankingSql = `
            SELECT 
                p.id_player,
                pl.nome,
                pl.nickname,
                SUM(p.pontuacao) AS total_pontuacao
            FROM 
                pontuacoes p
            JOIN 
                players pl ON pl.id = p.id_player
            WHERE 
                p.id_jogo = ?
            GROUP BY 
                p.id_player
            ORDER BY 
                total_pontuacao DESC
            LIMIT 10;
        `;

        connection.query(rankingSql, [idJogo], (err, rankingResults) => {
            if (err) {
                return res.status(500).send("Erro ao buscar ranking.");
            }
            res.status(200).json(rankingResults);
        });
    });
});

router.post("/", (req, res) => {
    const { id_jogo, id_player, pontuacao, data_registro } = req.body;

    let error = validarDados(id_jogo, id_player, pontuacao, data_registro);
    if (error != "") {
        return res.status(400).send(error);
    }

    let sql = "SELECT * FROM jogos where id = ?";
    connection.query(sql, [id_jogo], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao buscar o jogo");
        }
        if (results.length === 0) {
            return res.status(404).send("Nenhum jogo com este ID encontrado!");
        }
    });

    sql = "SELECT * FROM players where id = ?";
    connection.query(sql, [id_player], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao buscar o jogador");
        }
        if (results.length === 0) {
            return res.status(404).send("Nenhum jogador com este ID encontrado!");
        }
    });

    sql = "INSERT INTO pontuacoes (id_jogo, id_player, pontuacao, data_registro) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id_jogo, id_player, pontuacao, data_registro], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao cadastrar pontuação");
            return;
        }
        res.status(200).send("Pontuação cadastrada com sucesso");
    });
});

router.get("/jogos/populares", (_, res) => {
    const query = `
        SELECT 
            j.nome AS nome_jogo,
            COUNT(p.id) AS total_pontuacoes,
            SUM(p.pontuacao) AS soma_pontuacoes
        FROM 
            pontuacoes p
        JOIN 
            jogos j ON p.id_jogo = j.id
        GROUP BY 
            p.id_jogo
        ORDER BY 
            total_pontuacoes DESC
        LIMIT 3;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Erro ao buscar os jogos populares");
            return;
        }
        res.json(results);
    });
});



function validarDados(id_jogo, id_player, pontuacao, data_registro) {
    if (!id_jogo || !id_player || !pontuacao || !data_registro) {
        return "Todos os campos são obrigatórios!"
    }

    if (pontuacao < 0) {
        return "A pontuação não pode ser um valor negativo."
    }

    if (!validarData(data_registro)) {
        return "Data inválida. Use o formato YYYY-MM-DD.";
    }

    return "";
}

module.exports = router;