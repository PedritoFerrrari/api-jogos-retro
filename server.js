const express = require("express");
const app = express();
const jogosRoutes = require("./routes/jogosRoutes");
const playerRoutes = require("./routes/playerRoutes");
const pontuacoesRoutes = require("./routes/pontuacoesRoutes");

app.use(express.json());
app.use("/jogos", jogosRoutes);
app.use("/jogadores", playerRoutes);
app.use("/pontuacoes", pontuacoesRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
   