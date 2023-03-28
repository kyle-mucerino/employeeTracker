use employees;

INSERT INTO department
  (name)
VALUES 
  ('Instruction'),
  ('Administration'),
  ('Health & Safety');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('History Teacher', 50000, 1),
  ('Science Teacher', 50000, 1),
  ('Math Teacher', 50000, 1),
  ('Music Teacher', 50000, 1),
  ('Lead Administrator', 30000, 2),
  ('Assistant Admin', 25000, 2),
  ('Nurse', 30000, 3),
  ('Security', 25000, 3);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Leslie', 'Knope', 1, NULL),
  ('Ben', 'Wyatt', 2, NULL),
  ('Tim', 'Riggins', 3, NULL),
  ('Bob', 'Belcher', 4, 1),
  ('Peter', 'Griffin', 5, NULL),
  ('John', 'Snow', 6, NULL),
  ('Betty', 'Crocker', 7, NULL),
  ('Chris', 'Christopherson', 8, NULL);
