INSERT INTO department(name) 
VALUES
('Marketing'),
('Finance'),
('Security'),
("Development"),
("Legal"),
("Sales"),
("Customer Service");

INSERT INTO role(title, salary,department_id)
VALUES
('Marketing Lead', 103000, 1),
('Finance Associate', 130000, 2),
('Cybersecurity', 90000, 3),
('Developer', 95000, 4),
('CS Manager', 75000, 7);

INSERT INTO employee(first_name, last_name, manager_id, role_id)
VALUES
('KELVIN', 'GUESS', 1,2),
('MIKE', 'TYSON', 2,3),
('DAVIE', 'BUSTERS', 2, 3),
('HOPPER', 'IHOP', NULL, 5),
('RAMBO', 'SMITH', 2, 4);