const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const alunoRouter = express.Router();

// Rota para cadastro de alunos
alunoRouter.post("/cadastrar", async (req, res) => {
  try {
    const { nome, dataNascimento, turma } = req.body;
    console.log(nome, dataNascimento, turma )
    if (!turma) {
      return res.status(400).json("Insira uma turma");
    }

    const consulta = await prisma.aluno.findFirst({
      where: {
        nome: nome,
        dataNascimento: dataNascimento,
        fk_turma_codTurma: parseInt(turma),
      },
    });

    if (consulta) {
      return res.status(401).json("Já existe um aluno com esses dados");
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome,
        dataNascimento,
        fk_turma_codTurma: parseInt(turma), // Certifique-se de usar o campo correto
      },
    });

    res.status(201).json({ message: "Aluno Cadastrado com sucesso", aluno });
  } catch (error) {
    console.error(error); // Logando o erro
    res.status(500).json({ error: "Erro ao cadastrar aluno" });
  }
});

// Rota para leitura de alunos
alunoRouter.get("/listar", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({include:{
     turma:{
      select:{
        nome:true
      }
     }
    }});
    res.status(200).json(alunos);
  } catch (error) {
    console.error(error); // Logando o erro
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

// Rota para buscar um aluno específico
alunoRouter.get("/listar/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;
    const aluno = await prisma.aluno.findFirst({
      where: {
        matricula: matricula,
      },
      include:{
        turma:{
          select:{
            codTurma:true,
            nome:true
          }
        }
      }
    });

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.status(200).json(aluno);
  } catch (error) {
    console.error(error); // Logando o erro
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
});

// Rota para atualizar um aluno
alunoRouter.put("/atualizar/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;
    const { nome, dataNascimento, turma } = req.body;
  

    const alunoAtualizado = await prisma.aluno.update({
      where: {
        matricula: matricula,
      },
      data: {
        nome,
        dataNascimento,
        fk_turma_codTurma: turma, 
      },
    });

    res.status(200).json({
      message: "Aluno atualizado com sucesso",
      aluno: alunoAtualizado,
    });
  } catch (error) {
    console.error(error); // Logando o erro
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

// Rota para deletar um aluno
alunoRouter.delete("/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;

    await prisma.aluno.delete({
      where: {
        matricula: matricula,
      },
    });
    res.status(200).json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    console.error(error); // Logando o erro
    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
});

module.exports = alunoRouter;