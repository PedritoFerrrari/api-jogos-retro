-- Apenas para documentação da minha estrutura do DB

CREATE DATABASE jogos_retro;

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    plataforma ENUM (
        'Super Nintendo', 
        'Mega Drive', 
        'Atari', 
        'PlayStation 5', 
        'Xbox Series X', 
        'Nintendo Switch', 
        'PC', 
        'PlayStation 4'
    ) NOT NULL,
    ano_lancamento DATE
);


CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120),
    nickname VARCHAR(120)
);

CREATE TABLE pontuacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_jogo INT,
    id_player INT,
    pontuacao VARCHAR(100),
    data_registro DATE
);

ALTER TABLE pontuacoes
ADD CONSTRAINT fk_pontuacoes_jogo
FOREIGN KEY (id_jogo) REFERENCES jogos(id);

ALTER TABLE pontuacoes
ADD CONSTRAINT fk_pontuacoes_player
FOREIGN KEY (id_player) REFERENCES players(id);


-- Dados ficticios para testes (gerados por IA)
INSERT INTO jogos (nome, plataforma, ano_lancamento) VALUES 
('Super Mario World', 'Super Nintendo', '1990-11-21'),
('Sonic the Hedgehog', 'Mega Drive', '1991-06-23'),
('Pitfall!', 'Atari', '1982-04-20'),
('The Last of Us Part II', 'PlayStation 4', '2020-06-19'),
('Halo Infinite', 'Xbox Series X', '2021-12-08'),
('The Legend of Zelda: Breath of the Wild', 'Nintendo Switch', '2017-03-03'),
('Cyberpunk 2077', 'PC', '2020-12-10'),
('Spider-Man: Miles Morales', 'PlayStation 5', '2020-11-12');
