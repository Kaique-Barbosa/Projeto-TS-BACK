create database escola;
use escola;

CREATE TABLE Professor (
    idProfessor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    areaAtuacao VARCHAR(45),
    telefone VARCHAR(45)
);

CREATE TABLE Turma (
    codTurma INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    periodo VARCHAR(45),
    fk_professor_idProfessor INT,
    FOREIGN KEY (fk_professor_idProfessor) REFERENCES Professor(idProfessor)
);

CREATE TABLE Aluno (
    matricula INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    dataNascimento DATE,
    fk_turma_codTurma INT,
    FOREIGN KEY (fk_turma_codTurma) REFERENCES Turma(codTurma)
);