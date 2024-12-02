/*
  Warnings:

  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `produto`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Professor` (
    `idProfessor` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `areaAtuacao` VARCHAR(45) NULL,
    `telefone` VARCHAR(45) NULL,

    PRIMARY KEY (`idProfessor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `codTurma` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `periodo` VARCHAR(45) NULL,
    `professorId` INTEGER NULL,

    PRIMARY KEY (`codTurma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluno` (
    `matricula` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `dataNascimento` DATETIME(3) NULL,
    `turma` VARCHAR(45) NULL,
    `turmaId` INTEGER NULL,

    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `Professor`(`idProfessor`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`codTurma`) ON DELETE SET NULL ON UPDATE CASCADE;
