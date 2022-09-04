CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NULL
);

CREATE TABLE role (
    department_id INTEGER,
    title VARCHAR(50) NULL,
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    salary DECIMAL(10,4) NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    first_name VARCHAR(50) NULL,
    last_name VARCHAR(50) NULL,
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_id INTEGER NULL,
    manager_id INTEGER NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN key (manager_id) REFERENCES employee(id)
);