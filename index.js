const {prompt} = require("inquirer");
const db = require("./Main/db");
require("console.table");

function loadPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesbyDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      case "VIEW_DEPARTMENTS":
        viewDapartments();
        break;
      case "ADD_DEPARTMENTS":
        addDepartments();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      default:
        quit();
    }
  })
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("");
      console.table(employees);
    })
    .then(() => loadPrompts());
}

function viewEmployeesbyDepartment() {
  db.findallDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({id, name}) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "departmentId",
          message: "For which department would you like to see employees?",
          choices: departmentChoices
        }
      ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log("");
          console.table(employees);
        })
        .then(() => loadPrompts())
    });
}

function viewEmployeesByManager() {
  db.findAllEmployees()
    .then(([rows]) => {
      let managers = rows;
      const managerChoices = managers.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "managerId",
          message: "Which employee do you want to see?",
          choices: managerChoices
        }
      ])
        .then(res => db.findAllEmployeesByManager(res.managerId))
        .then(([rows]) => {
          let employees = rows;
          console.log("");
          if (employees.length === 0) {
            console.log("No selected employee");
          } else {
            console.log(employees);
          }
        })
        .then(() => loadPrompts())
    });
}

