CREATE TABLE users (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users VALUES ("123", "camila.reimberg@gmail.com", "car123"), ("1234", "tiago.marmo@gmail.com", "tmm1234"), ("12345", "amora.reimberg@gmail.com", "amr12345");

CREATE TABLE products (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT NOT NULL,
price REAL NOT NULL,
category TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products VALUES ("1", "Bolsa Preta", 125, "Acessórios"), ("2", "Google Home", 350, "Eletrônicos"), ("3", "Casaco Inverno Vermelho", 238, "Roupas e calçados"), ("4", "Calça Linho", 130, "Roupas e calçados");