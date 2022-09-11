CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE role (
    department_id INTEGER,
    title VARCHAR(50) NOT NULL,
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id)
);