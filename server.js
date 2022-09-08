const db = require('./db/connection');
const inquirer = require('inquirer');
const table = require('console.table');
const util = require('util');
const express = require("express");
const { exit } = require('process');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

db.query - util.promisify(db.query);

init();

async function init() {
  const questions = [
    {
      type: 'list',
      message: 'What do you want to do?',
      name: 'answer',
      choices: [
        'View all Departments',
        'View all Roles',
        'View all Employees',
        'Add Deparment',
        'Add Employee',
        'Update Employee role',
        'Delete Employee',
        'Delete Department',
        'Quit',
      ]
    }];

  const { answer } = await inquirer.prompt(questions);
  switch (answer) {
    case 'View all Departments':
      departments();
      break;
    case 'Add Deparment':
      addDepartment();
      break;
    case 'Delete Department':
      deleteDepartment();
      break;
    case 'View all Employees':
      viewEmployees();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'Delete Employee':
      deleteEmployee();
      break;
    case 'View all Roles':
      viewRoles();
      break;
    case 'Update Employee role':
      updateRoles();
      break;
    case 'Quit':
      exit();
    default:
      break;
  }
}
const departments = () => {
  const view = 'SELECT * FROM department'

  db.query(view, (err,res) => {
    if(err){
      console.log(err + 'department funct');
    } else {
      console.table(res);
      return init();
    }
  });
};

async function addDepartment() {
  const newDepartment = await inquirer.prompt({
    type: 'input',
    message: 'What department do you want to add?',
    name: 'department'
  });

  const answer = newDepartment.department;
  db.query('INSERT INTO department SET ?', {name: answer}, (err,res) => {
    if(err){
      console.log(err + 'new department')
    } else {
      console.log('deparment added')
      return init();
    }
  })
}

const deleteDepartment = () => {
  
}

const viewEmployees= () => {

}

const addEmployee = () => {

}

const deleteEmployee = () => {

}

const viewRoles = () => {

}

const updateRoles = () => {

}
