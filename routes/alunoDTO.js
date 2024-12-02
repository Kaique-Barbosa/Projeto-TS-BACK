const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const alunoRouter = express.Router();

// rota para cadastro de alunos
alunoRouter.post("/cadastrar", async (req, res) => {
  try {
    const { nome, matricula, dataNascimento, turma } = req.body;

    const consulta = await prisma.aluno.findFirst({
      where: {
        nome: nome,
        matricula: matricula,
        dataNascimento: dataNascimento,
        turma: turma,
      },
    });

    if (!turma) {
      return res.send(400).json("Insira uma turma");
    }

    if (consulta) {
      return res.status(401).json("Já existe um aluno com esses dados");
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome,
        matricula,
        dataNascimento,
        turma,
      },
    });

    res.status(200).json({ message: "Aluno Cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar aluno" });
  }
});

// rota para leitura de alunos
alunoRouter.get("/listar", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
});

// rota para buscar um aluno em especifico
alunoRouter.get("/listar/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;
    const aluno = await prisma.aluno.findFirst({
      where: {
        matricula: parseInt(matricula),
      },
    });

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Aluno" });
  }
});

// rota para atualizar atualizar um aluno
alunoRouter.put("/atualizar/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;
    const { nome, dataNascimento, turma } = req.body;

    const alunoAtualizado = await prisma.aluno.update({
      where: {
        matricula: parseInt(matricula),
      },
      data: {
        nome,
        dataNascimento,
        turma,
      },
    });

    res.status(200).json({
      message: "Aluno atualizado com sucesso",
      aluno: alunoAtualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

// rota para deletar um aluno
alunoRouter.delete("/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;

    await prisma.aluno.delete({
      where: {
        matricula: parseInt(matricula),
      },
    });
    res.status(200).json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
});

module.exports = alunoRouter;
