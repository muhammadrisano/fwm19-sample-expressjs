CREATE TABLE categories (
  id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  nama VARCHAR(64),
  description VARCHAR(128),
  PRIMARY KEY(id)
);

CREATE TABLE distributor (
  id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  nama VARCHAR(64),
  alamat TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE products (
  id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  nama VARCHAR(64),
  description VARCHAR(128),
  price INT,
  stock INT,
  category_id INT,
  distributor_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(category_id) REFERENCES categories(id),
  FOREIGN KEY(distributor_id) REFERENCES distributor(id)
);

INSERT INTO categories(nama, description)VALUES('mininam', 'minuman bla bla');

INSERT INTO categories(nama, description)VALUES('minunam', 'minuman bla bla'), ('perabotan', 'perabotan bla bla'), ('assesories', 'assesories bla bla');

INSERT INTO distributor(nama, alamat)VALUES('PT. CBA Agung',	'Jl. Padang'), ('PT. Pratama Mulia', 'JL. Pekanbaru'), ('PT. Sari Indah', 'JL. Bengkulu'), ('PT. Berlian Mutiara',	'JL. Jakarta');

INSERT INTO products(nama, description, price, stock, category_id, distributor_id)VALUES('Indomie Ayam Goreng',	'Indomie Ayam Goreng bla bla', 3000,	20,	1,	1);

SELECT products.id, products.nama, products.description, products.price, products.stock, categories.nama AS category_name, categories.description AS category_description FROM products INNER JOIN categories ON products.category_id = categories.id;

SELECT products.id, products.nama, products.description, products.price, products.stock, categories.nama AS category_name, categories.description AS category_description, distributor.nama, distributor.alamat  FROM products INNER JOIN categories ON products.category_id = categories.id INNER JOIN distributor ON products.distributor_id = distributor.id;