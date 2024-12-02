/*
  Warnings:

  - You are about to drop the column `turma` on the `aluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `turma`;

-- AlterTable
ALTER TABLE `turma` MODIFY `codTurma` INTEGER NOT NULL AUTO_INCREMENT;
