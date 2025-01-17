const express = require('express');
const db = require('../db'); // Importa a conexão com o banco
const router = express.Router();

// 1. Listar todos os livros
router.get('/', (req, res) => {
    db.query('SELECT * FROM livros', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar livros');
        } else {
            res.json(results);
        }
    });
});

// 2. Buscar livro por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM livros WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar o livro');
        } else if (results.length === 0) {
            res.status(404).send('Livro não encontrado');
        } else {
            res.json(results[0]);
        }
    });
});

// 3. Criar um novo livro
router.post('/', (req, res) => {
    const { titulo, autor, genero, ano_publicacao } = req.body;
    const sql = 'INSERT INTO livros (titulo, autor, genero, ano_publicacao) VALUES (?, ?, ?, ?)';
    db.query(sql, [titulo, autor, genero, ano_publicacao], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao adicionar o livro');
        } else {
            res.status(201).send('Livro adicionado com sucesso');
        }
    });
});

// 4. Atualizar um livro
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, ano_publicacao } = req.body;
    const sql = 'UPDATE livros SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ? WHERE id = ?';
    db.query(sql, [titulo, autor, genero, ano_publicacao, id], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao atualizar o livro');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Livro não encontrado');
        } else {
            res.send('Livro atualizado com sucesso');
        }
    });
});

// 5. Deletar um livro
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM livros WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao deletar o livro');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Livro não encontrado');
        } else {
            res.send('Livro deletado com sucesso');
        }
    });
});

module.exports = router;
