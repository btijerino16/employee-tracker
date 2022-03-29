INSERT INTO department (id, dept_name)
VALUES (1, "Leadership"),
       (2, "Operations"),
       (3, "Sales"),
       (4, "Finance"),
       (5, "Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 400000, 1),
       ("CFO", 250000, 1),
       ("COO", 250000, 1),
       ("CIO", 300000, 1),
       ("Sr. Engineer", 150000, 2),
       ("Jr. Engineer", 80000, 2),
       ("Accounts Receivable", 70000, 3),
       ("Accounts Payable", 70000, 3),
       ("Business Development", 200000, 3),
       ("Sales Support", 100000, 4),
       ("Attorney", 300000, 4),
       ("Paralegal", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Thomas", 1, Null),
       ("Sara", "Smith", 1, Null),
       ("Katie", "Keruig", 1, Null),
       ("Ian", "Lance", 1, Null),
       ("Clarissa", "Right", 2, 1),
       ("Sandra", "Cerda", 2, 1),
       ("Elisa", "Shelar", 3, 2),
       ("Kelly", "Daugharty", 3, 2),
       ("Kevin", "Brix", 4, 1),
       ("Kim", "Evans", 4, Null),
       ("John", "Brooks", 5, Null),
       ("Alysse", "Miller", 5, Null);