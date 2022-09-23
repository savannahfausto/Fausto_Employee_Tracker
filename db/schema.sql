DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
  id INT NOT NULL,
  first_name VARCHAR(100) NOT NULL, 
  last_name VARCHAR(100) NOT NULL
);