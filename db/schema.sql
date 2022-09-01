CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE role (
    department_id INTEGER,
    title VARCHAR(50),
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN key (manager_id) REFERENCES employee(id)
);