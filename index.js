const inquirer = require('inquirer');

const menu = function() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'menu',
                message: "What would you like to do?",
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            },
        )
        .then (answers => {
            switch (answers) {
                case "View All Employees": 
                break;
                case "Add Employee": 
                break;
                case "Update Employee Role": 
                break;
                case "View All Roles": 
                break;
                case "Add Role": 
                break;
                case "View All Departments": 
                break;
                case "Add Department": 
                break;
                default: 
            }
        })
}