 const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const turmaRouter = express.Router();

// rota para criar uma turma
turmaRouter.post("/cadastrar", async (req, res) => {
  try {
    const { nome, periodo, professor } = req.body;

    if( !nome || !periodo || !professor){
      return res.status(401).json("Preencha todos os campos")
    }

    const consultaTurma = await prisma.turma.findFirst({
      where:{
        nome, 
        periodo, 
        fk_professor_idprofessor:professor
      }
    }) 

    if(consultaTurma){
      return res.status(400).json("Já exite uma turma cadastrada")
    }

    

      await prisma.turma.create({
      data: {
        nome, 
        periodo, 
        fk_professor_idprofessor:professor
      },
    });

    res.status(200).json({ message: "Turma criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar turma" });
  }
});

// rota para buscar uma turma 
turmaRouter.get("/listar", async (req, res) => {
  try {
    const turma = await prisma.turma.findMany({include:{
      professor:{
        select:{
          nome:true
        }
      }
    }}
  );

    if (!turma) {
      return res.status(404).json({ error: "Não existe turma cadastrada" });
    }
    res.status(200).json(turma);

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Turmas" });
  }
});

turmaRouter.get("/listar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const turma = await prisma.turma.findFirst({
      where: {
        codTurma: parseInt(id),
      },
      include:{
        professor:{
          select:{
            nome:true
          }
        }
      }
    });

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrado" });
    }
    res.status(200).json(turma);

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Turma" });
  }
});

// rota para buscar atualizar uma turma
turmaRouter.put("/atualizar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {codTurma, nome, periodo, professor} = req.body;

    const turma = await prisma.turma.update({
      where: {
        codTurma: parseInt(id),
      },
      data: {
        codTurma,
        nome,
        periodo,
        fk_professor_idprofessor: professor,
      }
    });

    res
      .status(200)
      .json({message: "Turma atualizada com sucesso", turma: turma});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar Truma" });
  }
});

// rota para deletar uma turma
turmaRouter.delete("/deletar/:id", async (req, res) => {
  try {
    const {id} = req.params;
    
    await prisma.turma.delete({
      where: {
        codTurma: parseInt(id),
      },
    });
    res.status(200).json({ message: "Turma deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar Turma" });
  }
});

module.exports = turmaRouter;
