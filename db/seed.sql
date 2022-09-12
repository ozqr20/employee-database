-- Departments 
INSERT INTO department(name) VALUES ('Marketing');
INSERT INTO department(name) VALUES ('Finance');
INSERT INTO department(name) VALUES ('Security');
INSERT INTO department(name) VALUES ("Development");
INSERT INTO department(name) VALUES ("Sales");
INSERT INTO department(name) VALUES ("Customer Service");

-- Roles
INSERT INTO role(title, salary,department_id) VALUES ('Marketing Lead', 103000, 1);
INSERT INTO role(title, salary,department_id) VALUES ('Finance Associate', 130000, 2);
INSERT INTO role(title, salary,department_id) VALUES ('Cybersecurity', 90000, 3);
INSERT INTO role(title, salary,department_id) VALUES ('Developer', 95000, 4);
INSERT INTO role(title, salary,department_id) VALUES ('Sales Representative', 75000, 5);
INSERT INTO role(title, salary,department_id) VALUES ('Front Desk', 75000, 6);

-- Employees
INSERT INTO employee(first_name, last_name, manager_id, role_id) VALUES ('KELVIN', 'GUESS', 1,2);
INSERT INTO employee(first_name, last_name, manager_id, role_id) VALUES ('MIKE', 'TYSON', 1,6);
INSERT INTO employee(first_name, last_name, manager_id, role_id) VALUES ('DAVIE', 'BUSTERS', 1, 3);
INSERT INTO employee(first_name, last_name, manager_id, role_id) VALUES ('HOPPER', 'IHOP', NULL, 5);
INSERT INTO employee(first_name, last_name, manager_id, role_id) VALUES ('RAMBO', 'SMITH', 1, 4);
INSERT INTO employee(first_name, last_name, role_id) VALUES ('MARIA', 'CROWREN', 1);
INSERT INTO employee(first_name, last_name, role_id) VALUES ('IVAN', 'MELO', 2);