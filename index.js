const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employee_tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Add departments",
                    "Add roles",
                    "Add employees",
                    "View departments",
                    "View roles",
                    "View employees",
                    "Update employee roles",
                    "QUIT"
                ]
            }
        ])
        .then(function (answer) {
            if (answer.action === "Add departments") {
                addDepartments();
            }
            else if (answer.action === "Add roles") {
                addRoles();
            }
            else if (answer.action === "Add employees") {
                addEmployees();
            }
            else if (answer.action === "View departments") {
                viewDepartments();
            }
            else if (answer.action === "View roles") {
                viewRoles();
            }
            else if (answer.action === "View employees") {
                viewEmployees();
            }
            else if (answer.action === "Update employee roles") {
                updateEmployees();
            } else {
                connection.end();
            }
        });
}

function addDepartments() {
    inquirer.prompt([
        {
            type: "input",
            name: "addDepartment",
            message: "What is the name of the department you would like to add?"
        }
    ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.addDepartment
                },
                function (err) {
                    if (err) throw err;
                    console.log("The department was added successfully!");
                    start();
                }
            );

        });
};

function addRoles() {
    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the role title you would like to add?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the role you would like to add?"
        },
        {
            type: "input",
            name: "roleDeptID",
            message: "What is the department ID of the role you would like to add?"
        }
    ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.roleSalary,
                    department_id: answer.roleDeptID
                },
                function (err) {
                    if (err) throw err;
                    console.log("The role was added successfully!");
                    start();
                }
            );

        });
};

function addEmployees() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "What is the first name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "What is the last name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "employeeRoleID",
            message: "What is the role ID of the employee you would like to add?"
        },
        {
            type: "input",
            name: "employeeManagerID",
            message: "What is the manager ID of the employee you would like to add?"
        }
    ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.employeeFirstName,
                    last_name: answer.employeeLastName,
                    role_id: answer.employeeRoleID,
                    manager_id: answer.employeeManagerID
                },
                function (err) {
                    if (err) throw err;
                    console.log("The employee was added successfully!");
                    start();
                }
            );

        });
};

function viewDepartments() {
    console.log("Viewing all departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        start();
    });
};

function viewRoles() {
    console.log("Viewing all roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        start();
    });
};

function viewEmployees() {
    console.log("Viewing all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        start();
    });
};

function updateEmployees() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeID",
            message: "What is the ID of the employee you would like to add?"
        },
        {
            type: "list",
            name: "employeeCat",
            message: "What would you like to change?",
            choices: [
                "first_name",
                "last_name",
                "role_id",
                "manager_id"
            ]
        },
        {
            type: "input",
            name: "employeeUpdate",
            message: "What is the updated information?"
        }
    ])
        .then(function (answer) {
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        [answer.employeeCat]: answer.employeeUpdate
                    },
                    {
                        id: answer.employeeID
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " products updated!\n");
                    start();
                }
            );
        });
};