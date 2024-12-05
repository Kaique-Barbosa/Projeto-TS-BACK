const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const professorRouter = express.Router();

// Rota para cadastro de professor
professorRouter.post("/cadastrar", async (req, res) => {
  try {
    const { nome, areaAtuacao, telefone } = req.body;
    if (!nome || !areaAtuacao || !telefone) {
      return res.status(400).json("Preencha todos os campos");
    }

    const consultaProf = await prisma.professor.findFirst({
      where: {
        nome,
        areaAtuacao,
        telefone,
      },
    });

    if (consultaProf) {
      return res.status(400).json("Já existe um professor cadastrado");
    }

    await prisma.professor.create({
      data: {
        nome,
        areaAtuacao,
        telefone,
      },
    });

    res.status(201).json({ message: "Professor Cadastrado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao cadastrar Professor", error });
  }
});

// Rota para leitura de professores
professorRouter.get("/listar", async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.status(200).json(professores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
});

// Rota para buscar um professor específico
professorRouter.get("/listar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await prisma.professor.findFirst({
      where: {
        idprofessor: parseInt(id),
      },
    });

    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }

    res.status(200).json(professor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar professor" });
  }
});

// Rota para atualizar um professor
professorRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, areaAtuacao, telefone } = req.body;

    const profAtualizado = await prisma.professor.update({
      where: {
        idprofessor: parseInt(id),
      },
      data: {
        nome,
        areaAtuacao,
        telefone,
      },
    });

    res.status(200).json({
      message: "Professor atualizado com sucesso",
      professor: profAtualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
});

// Rota para deletar um professor
professorRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.professor.delete({
      where: {
        idprofessor: parseInt(id),
      },
    });
    res.status(200).json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
});

module.exports = professorRouter;