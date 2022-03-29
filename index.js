const inquirer = require('inquirer');
require('console.table');
const db = require('./db');

promptUser = () => {
    inquirer
      .prompt([
        {
          name: "choices",
          type: "list",
          message: "Please select an option:",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee", 
            "Update Employee Role",
    
            'Delete Employee',
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        const { choices } = answers;
  
        if (choices === "View All Departments") {
          viewAllDepartments();
        }
  
        if (choices === "View All Roles") {
          viewAllRoles();
        }
  
        if (choices === "View All Employees") {
          viewAllEmployees();
        }
  
        if (choices === "Add Department") {
          addDepartment();
        }
        if (choices === "Add Role") {
          addRole();
        }
        if (choices === "Add Employee") {
          addEmployee();
        }
  
        if (choices === "Update Employee Role") {
          updateEmployeeRole();
        }
        // BONUS: DELETE
        //   if (choices === 'Remove Department') {
        //     removeDepartment();
        // }
        //   if (choices === 'Remove Role') {
        //       removeRole();
        //   }
        if (choices === 'Delete Employee') {
          deleteEmployee();
        }
  
        if (choices === "Exit") {
          db.end();
        }
      });
  };
  
  // READ department
  viewAllDepartments = () => {
    const sql = `SELECT * FROM department;`;
  
    db.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
  };
  
  // READ role
  viewAllRoles = () => {
    const sql = `SELECT * FROM role`;
  
    db.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
  };
  
  //  READ employees
  viewAllEmployees = () => {
    const sql = `SELECT employee.id,
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.dept_name,
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager,
                        role.salary
                FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  
    db.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
  };
  
  // CREATE department
  addDepartment = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "addDept",
          message: "What department would you like to add?",
          validate(addDept) {
            if (addDept) {
              return true;
            } else {
              console.log("Please enter a valid department");
              return false;
            }
          },
        },
      ])
  
      .then((answer) => {
        const sql = `INSERT INTO department (dept_name)
                      values (?)`;
  
        db.query(sql, answer.addDept, (err, res) => {
          if (err) throw err;
          console.log("Added New Department");
  
          viewAllDepartments();
        });
      });
  };
  
  // CREATE role
  addRole = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the role salary amount?",
        },
      ])
      .then((answer) => {
        const params = [answer.title, answer.salary];
  
        // POPULATE data from department table
        const roleSql = `SELECT * FROM department`;
  
        db.query(roleSql, (err, data) => {
          if (err) throw err;
  
          const dept = data.map(({ dept_name, id }) => ({ name: dept_name, value: id }));
  
          inquirer
            .prompt([
              {
                type: "list",
                name: "dept",
                message: "Select Department?",
                choices: dept,
              },
            ])
            .then((deptChoice) => {
              const dept = deptChoice.dept;
              params.push(dept);
  
              const sql = `INSERT INTO role (title, salary, department_id)
                          VALUES (?, ?, ?)`;
  
              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Added new role!");
  
                viewAllRoles();
              });
            });
        });
      });
  };
  
  // CREATE employee
  addEmployee = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
      ])
      .then((answer) => {
        const params = [answer.first_name, answer.last_name];
  
        // POPULATE data from role table
        const roleSql = `SELECT * FROM role`;
  
        db.query(roleSql, (err, data) => {
          if (err) throw err;
  
          const role = data.map(({ title, id }) => ({ name: title, value: id }));
  
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "Select Role",
                choices: role,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);
  
              const sql = `INSERT INTO employee (first_name, last_name, role_id)
                          VALUES (?, ?, ?)`;
  
              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Added new employee!");
  
                viewAllEmployees();
              });
            });
        });
      });
  };
  
  // UPDATE employee role
  updateEmployeeRole = () => {
    const employeeData = `SELECT * FROM employee`;
  
    db.query(employeeData, (err, data) => {
      if (err) throw err;
  
      const employee = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
      
      inquirer
            .prompt([
              {
                type: "list",
                name: "name",
                message: "Select Employee to update",
                choices: employee,
              }
            ])
            .then(employChoice => {
              const employee =  employChoice.name;
              const params = [];
              params.push (employee);
  
              const roleSql = `SELECT * FROM role`;
  
              db.query(roleSql, (err, result) => {
                if (err) throw err;
  
                const roles = data.map (({title, id}) => ({name: title, value: id}));
  
                inquirer. prompt([
                  {
                    type: "list",
                    name: "role",
                    message: "Select Employee role/title to update",
                    choices: roles,
                  }
                ])
                .then(roleChoice =>{
                  const role = roleChoice.role;
                  params.push(role);
  
                  let employee = params[0]
                  params[0] = role 
                  params [1] = employee
  
                  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                  
                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee role information updated!!");
                  
                    viewAllEmployees();
                });
            });
          });
        });
      });
    };
  
    // DELETE employee
    deleteEmployee = () => {
      const employeeData = `SELECT * FROM employee`;
    
      db.query(employeeData, (err, data) => {
        if (err) throw err;
    
        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        
        inquirer. prompt([
          {
            type: "list",
            name: "name",
            message: "Select Employee to delete",
            choices: employees,
          }
        ])
        .then(empDelete =>{
          const employee = empDelete.name;
  
          const sql = `DELETE FROM employee WHERE id = ?`;
          
          db.query(sql, employee, (err, result) => {
            if (err) throw err;
            console.log("Employee DELETED!!");
          
            viewAllEmployees();
        });
    });
  });
  };