-- ============================================================
-- Banco de Dados: Livraria EntreLinhas (MySQL)
-- Migrado a partir de products.json
-- ============================================================

CREATE DATABASE IF NOT EXISTS livraria_entrelinhas
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE livraria_entrelinhas;

-- ------------------------------------------------------------
-- Tabela de categorias
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabela de livros
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(120) NOT NULL,
  categoria_id INT NOT NULL,
  editora VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  paginas INT NOT NULL,
  destaque BOOLEAN NOT NULL DEFAULT FALSE,
  descricao TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  imagem VARCHAR(255) NOT NULL,
  CONSTRAINT fk_livros_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- População da tabela categorias
-- ------------------------------------------------------------
INSERT INTO categorias (id, nome) VALUES
  (1, 'Fantasia'),
  (2, 'Romance'),
  (3, 'Tecnologia'),
  (4, 'Ficção Científica');

-- ------------------------------------------------------------
-- População da tabela livros (dados do JSON)
-- ------------------------------------------------------------
INSERT INTO livros (id, titulo, autor, categoria_id, editora, ano, paginas, destaque, descricao, preco, imagem) VALUES
  (1, 'O Nome do Vento', 'Patrick Rothfuss', 1, 'Arqueiro', 2009, 656, TRUE, 'A história de Kvothe, um jovem de talento extraordinário que se torna o mago mais notório que o mundo já viu.', 64.90, './src/assets/books/book-1.svg'),
  (2, 'O Senhor dos Anéis: A Sociedade do Anel', 'J.R.R. Tolkien', 1, 'HarperCollins', 2019, 576, FALSE, 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído.', 74.90, './src/assets/books/book-2.svg'),
  (3, 'Mistborn: O Império Final', 'Brandon Sanderson', 1, 'LeYa', 2014, 608, FALSE, 'Em um mundo coberto por cinzas e governado por um tirano imortal, uma jovem ladra descobre poderes alomânticos raros.', 69.90, './src/assets/books/book-3.svg'),
  (4, 'Orgulho e Preconceito', 'Jane Austen', 2, 'Martin Claret', 2018, 424, TRUE, 'O clássico romance sobre Elizabeth Bennet e Sr. Darcy, explorando costumes, família e primeiras impressões na Inglaterra.', 44.90, './src/assets/books/book-4.svg'),
  (5, 'Os Sete Maridos de Evelyn Hugo', 'Taylor Jenkins Reid', 2, 'Paralela', 2019, 360, FALSE, 'Lendária estrela de Hollywood decide contar toda a verdade sobre sua vida glamorosa e escandalosa a uma jornalista.', 54.90, './src/assets/books/book-5.svg'),
  (6, 'A Biblioteca da Meia-Noite', 'Matt Haig', 2, 'Bertrand Brasil', 2021, 308, FALSE, 'Entre a vida e a morte existe uma biblioteca com infinitos livros que permitem experimentar outras escolhas de vida.', 52.90, './src/assets/books/book-6.svg'),
  (7, 'Código Limpo', 'Robert C. Martin', 3, 'Alta Books', 2009, 425, TRUE, 'Habilidades práticas do Agile Software para escrever código legível, sustentável e profissional em qualquer linguagem.', 94.90, './src/assets/books/book-7.svg'),
  (8, 'O Programador Pragmático', 'Andrew Hunt e David Thomas', 3, 'Bookman', 2020, 352, FALSE, 'De aprendiz a mestre: lições essenciais sobre arquitetura, automação, testes e carreira no desenvolvimento de software.', 109.90, './src/assets/books/book-8.svg'),
  (9, 'Entendendo Algoritmos', 'Aditya Y. Bhargava', 3, 'Novatec', 2017, 264, FALSE, 'Um guia ilustrado para programadores e outros curiosos aprenderem estruturas de dados e algoritmos de forma intuitiva.', 79.90, './src/assets/books/book-9.svg'),
  (10, 'Duna', 'Frank Herbert', 4, 'Aleph', 2017, 680, TRUE, 'No planeta desértico Arrakis, Paul Atreides enfrenta intrigas políticas e ecológicas pelo controle da especiaria melange.', 84.90, './src/assets/books/book-10.svg'),
  (11, 'Neuromancer', 'William Gibson', 4, 'Aleph', 2016, 320, FALSE, 'A obra fundadora do movimento cyberpunk sobre hackers, inteligência artificial e megacorporações no ciberespaço.', 59.90, './src/assets/books/book-11.svg'),
  (12, 'O Problema dos Três Corpos', 'Cixin Liu', 4, 'Suma', 2016, 320, FALSE, 'Um projeto secreto envia sinais ao espaço e estabelece contato com uma civilização alienígena à beira do colapso.', 62.90, './src/assets/books/book-12.svg');
