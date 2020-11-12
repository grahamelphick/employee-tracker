const inquirer = require("inquirer");
const mysql = require("mysql");

inquirer.prompt([
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "Add",
            "View",
            "Update"
        ]
    },
    {
        type: "list",
        name: "addChoices",
        message: "What would you like to add to?",
        choices: [
            "Departments",
            "Roles",
            "Employees"
        ]
    },
    {
        type: "list",
        name: "viewChoices",
        message: "What would you like to view?",
        choices: [
            "Departments",
            "Roles",
            "Employees"
        ]
    },
    {
        type: ""
    }

])