/*
  Warnings:

  - You are about to drop the column `turmaId` on the `aluno` table. All the data in the column will be lost.
  - The primary key for the `professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idProfessor` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `turma` table. All the data in the column will be lost.
  - Added the required column `fk_turma_codTurma` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Made the column `dataNascimento` on table `aluno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `turma` on table `aluno` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `idprofessor` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_professor_idprofessor` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `aluno` DROP FOREIGN KEY `Aluno_turmaId_fkey`;

-- DropForeignKey
ALTER TABLE `turma` DROP FOREIGN KEY `Turma_professorId_fkey`;

-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `turmaId`,
    ADD COLUMN `fk_turma_codTurma` INTEGER NOT NULL,
    MODIFY `matricula` INTEGER NOT NULL,
    MODIFY `dataNascimento` DATETIME(3) NOT NULL,
    MODIFY `turma` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `professor` DROP PRIMARY KEY,
    DROP COLUMN `idProfessor`,
    ADD COLUMN `idprofessor` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `nome` VARCHAR(45) NULL,
    ADD PRIMARY KEY (`idprofessor`);

-- AlterTable
ALTER TABLE `turma` DROP COLUMN `professorId`,
    ADD COLUMN `fk_professor_idprofessor` INTEGER NOT NULL,
    MODIFY `codTurma` INTEGER NOT NULL,
    MODIFY `nome` VARCHAR(45) NULL;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_fk_professor_idprofessor_fkey` FOREIGN KEY (`fk_professor_idprofessor`) REFERENCES `Professor`(`idprofessor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_fk_turma_codTurma_fkey` FOREIGN KEY (`fk_turma_codTurma`) REFERENCES `Turma`(`codTurma`) ON DELETE RESTRICT ON UPDATE CASCADE;
