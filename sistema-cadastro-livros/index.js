const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Middleware para parsear JSON
app.use(express.json());

// Dados de exemplo (simulando um banco de dados)
let livros = [
    { id: 1, titulo: 'Livro A', autor: 'Autor A', genero: 'Gênero A', ano: 2021 },
    { id: 2, titulo: 'Livro B', autor: 'Autor B', genero: 'Gênero B', ano: 2020 },
];

// Rotas da API
app.get('/api/livros', (req, res) => {
    res.json(livros); // Retorna a lista de livros
});

app.post('/api/livros', (req, res) => {
    const novoLivro = req.body;
    novoLivro.id = livros.length + 1; // Gera um ID único
    livros.push(novoLivro);
    res.status(201).json(novoLivro); // Retorna o livro adicionado
});

app.put('/api/livros/:id', (req, res) => {
    const { id } = req.params;
    const livroAtualizado = req.body;
    const index = livros.findIndex(livro => livro.id === parseInt(id));

    if (index !== -1) {
        livros[index] = { id: parseInt(id), ...livroAtualizado };
        res.json(livros[index]);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

app.delete('/api/livros/:id', (req, res) => {
    const { id } = req.params;
    const index = livros.findIndex(livro => livro.id === parseInt(id));

    if (index !== -1) {
        const livroRemovido = livros.splice(index, 1);
        res.json(livroRemovido);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
