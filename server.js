const express = require("express");
const app = express();
const jogosRoutes = require("./routes/jogosRoutes");

app.use(express.json());
app.use("/jogos", jogosRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
   });
   