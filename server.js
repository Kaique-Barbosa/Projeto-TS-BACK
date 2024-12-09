const express = require("express");
const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");
// const jwt = require("jsonwebtoken");
// const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");

// INORTAÇÂO DE ROTAS
const aluno = require("./routes/alunoDTO");
const professor = require("./routes/professorDTO");
const turma = require("./routes/turmaDTO");


// DICAS PARA DEGUUGAR ERROS
// USAR:
// console.log(req.params)
// console.log(req.body)

dotenv.config();
const app = express();
const port = process.env.PORT || 3010; // porta onde o server rosará
app.use(cors());
app.use(express.json());

// uso de rotas

app.use("/aluno", aluno);
app.use("/professor", professor);
app.use("/turma", turma);


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
