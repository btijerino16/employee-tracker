DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    INDEX dep_ind (department_id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id VARCHAR(30),
    INDEX manager_id (manager_id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
    );