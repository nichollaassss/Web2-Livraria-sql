import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { pool, testConnection } from "./src/config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(express.static(__dirname));

// Listar todos os livros do MySQL
app.get("/api/livros", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                l.id,
                l.titulo AS name,
                l.autor AS author,
                c.nome AS category,
                l.editora AS publisher,
                l.ano AS year,
                l.paginas AS pages,
                l.destaque AS featured,
                l.descricao AS description,
                l.preco AS price,
                l.imagem AS image
            FROM livros l
            INNER JOIN categorias c ON l.categoria_id = c.id
            ORDER BY l.id ASC
        `);

        const livros = rows.map(row => ({
            ...row,
            featured: Boolean(row.featured),
            price: Number(row.price)
        }));

        res.json(livros);
    } catch (error) {
        console.error("Erro ao buscar livros no MySQL:", error);
        res.status(500).json({ error: "Erro ao consultar os livros no banco de dados." });
    }
});

// Buscar detalhes de um livro pelo ID
app.get("/api/livros/:id", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                l.id,
                l.titulo AS name,
                l.autor AS author,
                c.nome AS category,
                l.editora AS publisher,
                l.ano AS year,
                l.paginas AS pages,
                l.destaque AS featured,
                l.descricao AS description,
                l.preco AS price,
                l.imagem AS image
            FROM livros l
            INNER JOIN categorias c ON l.categoria_id = c.id
            WHERE l.id = ?
            `,
            [Number(req.params.id)]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Livro não encontrado." });
        }

        const livro = {
            ...rows[0],
            featured: Boolean(rows[0].featured),
            price: Number(rows[0].price)
        };

        res.json(livro);
    } catch (error) {
        console.error("Erro ao buscar livro por ID no MySQL:", error);
        res.status(500).json({ error: "Erro ao consultar o livro no banco de dados." });
    }
});

// Cadastrar novo livro no MySQL
app.post("/api/livros", async (req, res) => {
    const {
        name,
        author,
        category,
        publisher = "Edição Independente",
        year = 2026,
        pages = 280,
        featured = false,
        description,
        price,
        image = "./src/assets/books/book-1.svg"
    } = req.body;

    if (!name || !author || !category || !description || !Number.isFinite(Number(price)) || Number(price) <= 0) {
        return res.status(400).json({ error: "Dados do livro inválidos ou incompletos." });
    }

    try {
        let [catRows] = await pool.query("SELECT id FROM categorias WHERE nome = ?", [category]);
        let categoriaId;

        if (catRows.length > 0) {
            categoriaId = catRows[0].id;
        } else {
            const [catResult] = await pool.query("INSERT INTO categorias (nome) VALUES (?)", [category]);
            categoriaId = catResult.insertId;
        }

        const [result] = await pool.query(
            `
            INSERT INTO livros (titulo, autor, categoria_id, editora, ano, paginas, destaque, descricao, preco, imagem)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                name.trim(),
                author.trim(),
                categoriaId,
                publisher,
                Number(year),
                Number(pages),
                Boolean(featured),
                description.trim(),
                Number(price),
                image || "./src/assets/books/book-1.svg"
            ]
        );

        res.status(201).json({
            id: result.insertId,
            name: name.trim(),
            author: author.trim(),
            category,
            publisher,
            year: Number(year),
            pages: Number(pages),
            featured: Boolean(featured),
            description: description.trim(),
            price: Number(price),
            image: image || "./src/assets/books/book-1.svg"
        });
    } catch (error) {
        console.error("Erro ao inserir livro no MySQL:", error);
        res.status(500).json({ error: "Erro ao salvar o livro no banco de dados." });
    }
});

testConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor da Livraria EntreLinhas rodando em http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Falha ao conectar no MySQL. Verifique se o servidor MySQL está ativo e se database/livraria.sql foi importado:", error.message);
        process.exit(1);
    });
