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
        'PlayStation 4',
        'PSP'
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


INSERT INTO players (nome, nickname) VALUES
('Lucas Andrade', 'Lukezera'),
('Ana Beatriz', 'AninhaGamer'),
('Carlos Eduardo', 'CaduFPS'),
('Juliana Ramos', 'JuliTech'),
('Marcos Silva', 'Marquinhos'),
('Fernanda Oliveira', 'FefeKills'),
('Roberto Lima', 'BobSniper'),
('Isabela Costa', 'IsaFire'),
('Thiago Souza', 'Thigz'),
('Camila Rocha', 'Cam1la');



INSERT INTO pontuacoes (id_jogo, id_player, pontuacao, data_registro) VALUES
(1, 1, '1500', '2024-12-01'),
(1, 2, '1200', '2024-12-02'),
(1, 3, '1750', '2024-12-03'),
(2, 1, '2000', '2024-12-04'),
(2, 3, '2300', '2024-12-05'),
(2, 4, '1800', '2024-12-06'),
(3, 2, '900', '2024-12-07'),
(3, 4, '1100', '2024-12-08'),
(3, 5, '1300', '2024-12-09'),
(4, 1, '950', '2024-12-10'),
(4, 2, '1000', '2024-12-11'),
(4, 3, '1050', '2024-12-12'),
(5, 5, '1700', '2024-12-13'),
(5, 4, '1650', '2024-12-14'),
(5, 1, '1600', '2024-12-15');


INSERT INTO pontuacoes (id_jogo, id_player, pontuacao, data_registro) VALUES
(6, 2, '1450', '2025-01-01'),
(6, 4, '1600', '2025-01-02'),
(6, 1, '1500', '2025-01-03'),
(7, 3, '1700', '2025-01-04'),
(7, 5, '1850', '2025-01-05'),
(7, 1, '1725', '2025-01-06'),
(8, 2, '1100', '2025-01-07'),
(8, 3, '1150', '2025-01-08'),
(8, 4, '1120', '2025-01-09'),
(8, 1, '2000', '2025-01-10'),
(8, 5, '1950', '2025-01-11'),
(8, 3, '2100', '2025-01-12'),
(1, 4, '1800', '2025-01-13'),
(2, 5, '1900', '2025-01-14'),
(3, 1, '1400', '2025-01-15'),
(4, 2, '1500', '2025-01-16'),
(5, 3, '1750', '2025-01-17');