DROP TABLE IF EXISTS customer;

CREATE TABLE customer (
  id BIGINT AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  address VARCHAR(250) NOT NULL,
  city VARCHAR(250) NOT NULL,
  country_code VARCHAR(250) NOT NULL,
  loan_amount DOUBLE NOT NULL
);

INSERT INTO customer (name, address, city, country_code, loan_amount) VALUES
  ('John Smith', 'Sadama 10', 'Tallinn', 'EE', 250.50),
  ('Martin Saar', 'Estonia pst. 6', 'Tallinn', 'EE', 65.90),
  ('Rene Mitt', 'Aia 3', 'Viljandi', 'EE', 865.40),
  ('Aleksandrs Ozols', 'Riia mnt. 8', 'Riga', 'LV', 107.90),
  ('Maria Ivanovs', 'Jurmala 7', 'Jurmala', 'LV', 307),
  ('Adele Matias', 'Vilnius 2', 'Vilnius', 'LT', 5645)

