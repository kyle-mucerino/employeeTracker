const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

loadPrompts();

function loadPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT"
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLES"
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
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
        viewDepartments();
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
  });
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

function removeEmployee() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices
      }
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Employee removed!"))
      .then(() => loadPrompts());
  });
}

function updateEmployeeRole() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee role do you want to update?",
        choices: employeeChoices
      }
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            mesage: "Which role do you want to assign to selected employee?",
            choices: roleChoices
          }
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Updated employee role!"))
          .then(() => loadPrompts());
      });
    });
  });
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("");
      console.table(roles);
    })
    .then(() => loadPrompts());
}

function addRole() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    prompt([
      {
        name: "title",
        message: "Enter name of role"
      },
      {
        name: "title",
        message: "Enter role's salary"
      },
      {
        name: "list",
        name: "department_id",
        message: "Select the role's department",
        choices: departmentChoices
      }
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => loadPrompts());
    });
  });
}

function removeRole() {
  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    prompt([
      {
        type: "list",
        name: "roleId",
        message: "Please select the role to be removed",
        choices: roleChoices
      }
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("The role has been removed!"))
      .then(() => loadPrompts());
  });
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("");
      console.table(departments);
    })
    .then(() => loadPrompts());
}

function addDepartments() {
  prompt([
    {
      name: "name",
      message: "Please enter the deparmtent name"
    }
  ]).then((res) => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => loadPrompts());
  });
}

function removeDepartment() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt({
      type: "list",
      name: "departmentId",
      message: "Please select the department to be removed",
      choices: departmentChoices
    })
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log(`Department removed!`))
      .then(() => loadPrompts());
  });
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Please enter the employee's first name",
    },
    {
      name: "last_name",
      message: "Please enter the employee's last name",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "Please select the employee's role",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        db.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            })
          );

          managerChoices.unshift({
            name: "None",
            value: null
          });
          prompt({
            type: "list",
            name: "managerId",
            message: "Select the employee's manager",
            choices: managerChoices
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
              };
              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => loadPrompts());
        });
      });
    });
  });
}

function quit() {
  console.log("Quitting");
  process.exit();
}
