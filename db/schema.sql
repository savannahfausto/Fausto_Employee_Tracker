DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  title TEXT NOT NULL, 
  department_id INT NOT NULL, 
  salary INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(50) NOT NULL, 
  role_id TEXT NOT NULL, --link to roles department
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id),
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
);