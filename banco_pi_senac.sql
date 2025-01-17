/*CREATE DATABASE sistema_livros;*/
USE sistema_livros;

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    genero VARCHAR(255) NOT NULL,
    ano_publicacao INT NOT NULL
);

SELECT * FROM livros
