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
                    "Update employee roles"
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
                    console.log("Your auction was created successfully!");
                    start();
                }
            );

        });
}