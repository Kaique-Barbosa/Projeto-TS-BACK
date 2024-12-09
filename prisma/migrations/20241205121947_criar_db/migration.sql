-- CreateTable
CREATE TABLE `alunos` (
    `matricula` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `fk_turma_codTurma` INTEGER NOT NULL,

    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professores` (
    `idprofessor` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,
    `areaAtuacao` VARCHAR(45) NULL,
    `telefone` VARCHAR(45) NULL,

    PRIMARY KEY (`idprofessor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `codTurma` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,
    `periodo` VARCHAR(45) NULL,
    `fk_professor_idprofessor` INTEGER NOT NULL,

    UNIQUE INDEX `turmas_nome_key`(`nome`),
    PRIMARY KEY (`codTurma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_fk_turma_codTurma_fkey` FOREIGN KEY (`fk_turma_codTurma`) REFERENCES `turmas`(`codTurma`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_fk_professor_idprofessor_fkey` FOREIGN KEY (`fk_professor_idprofessor`) REFERENCES `professores`(`idprofessor`) ON DELETE RESTRICT ON UPDATE CASCADE;
