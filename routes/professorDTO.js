const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const professorRouter = express.Router();

// rota para cadastro de professor
professorRouter.post("/cadastrar", async (req, res) => {
  try {
    const { nome, areaAtuacao, telefone } = req.body;
    if (!nome || !areaAtuacao || !telefone) {
      return res.status(401).json("Preencha todos os campos");
    }

    const consultaProf = await prisma.turma.findFirst({
      where: {
        nome,
        areaAtuacao,
        telefone,
      },
    });

    if (!consultaProf) {
      return res.status(400).json("Já exite um profesor cadastrado");
    }

    await prisma.professor.create({
      data: {
        nome,
        areaAtuacao,
        telefone,
      },
    });

    res.status(200).json({ message: "Professor Cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({mensagem: "Erro ao cadastrar Professor", error });
  }
});

// rota para leitura de professor
professorRouter.get("/listar", async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
});

// rota para buscar um professor em especifico
professorRouter.get("/listar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await prisma.professor.findFirst({
      where: {
        idProfessor: parseInt(id),
      },
    });

    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }

    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professor" });
  }
});

// rota para buscar atualizar um professor
professorRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, areaAtuacao, telefone } = req.body;

    const profAtualizado = await prisma.professor.update({
      where: {
        idProfessor: parseInt(id),
      },
      data: {
        nome,
        areaAtuacao,
        telefone,
      },
    });

    res
      .status(200)
      .json({
        message: "Professor atualizado com sucesso",
        professor: profAtualizado,
      });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
});

// rota para deletar um professor
professorRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.professor.delete({
      where: {
        idProfessor: parseInt(id),
      },
    });
    res.status(200).json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
});

module.exports = professorRouter;
