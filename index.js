const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the database.`)
);

//if anything wrong with database will deal with that first before running menu prompt for the first time
db.connect((err) => {
    if (err) throw err;
    menu();
})

const menu = function() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: "What would you like to do?",
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            },
        ])
        .then (answers => {
            switch (answers.menu) {
                case "View All Employees": 
                viewEmployees();
                break;
                case "Add Employee": 
                addEmployee();
                break;
                case "Update Employee Role": 
                updateRole();
                break;
                case "View All Roles": 
                viewRoles();
                break;
                case "Add Role":
                addRole(); 
                break;
                case "View All Departments": 
                viewDepartments();
                break;
                case "Add Department": 
                addDepartment();
                break;
                default: 
                console.log('Goodbye');
                process.exit(0);
            }
        })
}

const addEmployee = function () {
    db.query('SELECT title AS name, id AS value FROM roles', function(err, roles){
        if (err) throw err;
        db.query('SELECT CONCAT(first_name," ",last_name) AS name, manager_id AS value FROM employees', function(err, employees){
            if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?"
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "What is the employee's role?",
                    choices: roles, 
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager?",
                    choices: employees,
            
                },

            ])
            .then (answers => {
                db.query('INSERT INTO employees SET ?', answers, function(err){
                    if (err) throw err;
                    console.log(`Added ${answers.firstName} ${answers.lastName}to the database.`);
                    menu();
                })
            })
        })
    })
}

    const addRole = function () {
        db.query('SELECT name, id AS value FROM departments', function(err, departments){
            if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "What is the name of the role?"
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: "What is the salary of the role?"
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: "Which department does the role belong to",
                    choices: departments,
                },
            

            ])
            .then (answers => {
                db.query('INSERT INTO employees SET ?', answers, function(err){
                    if (err) throw err;
                    console.log(`Added ${answers.firstName} ${answers.lastName}to the database.`);
                    menu();
                })
        })
    })
}

const addDepartment = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the name of the department?"
            },
        ])
        .then (answers => {
            db.query('INSERT INTO departments SET ?', answers, function(err){
                if (err) throw err;
                console.log(`Added ${answers.name} to the database.`);
                menu();
            })
        })
}

const viewEmployees = function () {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) throw err;
        console.log(results);
        menu();
    });
}

const viewRoles = function () {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) throw err;
        console.log(results);
        menu();
    });
}

const viewDepartments = function () {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) throw err;
        console.log(results);
        menu();
    });
}

const updateRole = function () {
    db.query('SELECT CONCAT(first_name," ",last_name) AS name, id as value FROM employees', function(err, employees){
        if (err) throw err;
        db.query('SELECT title AS name, id as value FROM roles', function(err, roles){
            if (err) throw err;
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: "Which employee's role do you want to update?",
                choices: employees,
            },
            {
                type: 'list',
                name: 'updateRole',
                message: "Which role do you want to assign the selected employee?",
                choices: roles, 
            },
        ])
        .then (answers => {
            db.query('UPDATE employees SET role_id = ? WHERE id = ?', [answers.updateRole, answers.updateEmployee], function(err){
                if (err) throw err;
                console.log(`updated ${employees.find(e => e.value === answers.updateEmployee).name} to the database.`);
                menu();
            })
        })
    }) 
    })
}
