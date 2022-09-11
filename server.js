const db = require('./db/connection');
const inquirer = require('inquirer');
const table = require('console.table');
const util = require('util');
const express = require("express");

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

db.query = util.promisify(db.query);

init();

async function init() {
  const questions = [
    {
      type: 'list',
      message: 'What do you want to do?',
      name: 'answer',
      choices: [
        'View all Departments',
        'Add Deparment',
        'Delete Department',
        'View all Employees',
        'Add Employee',
        'Delete Employee',
        'View all Roles',
        'Update Employee role',
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
    case 'Add Role':
      addRole();
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
      console.log('department added')
      return init();
    }
  });
};

async function deleteDepartment () {
  const removeDepartment = await db.query(
    'SELECT name AS departments FROM department'
  )
  const departmentChoices = await inquirer.prompt({
    type: 'list',
    message: 'What department you want to remove?',
    name: 'getdepartment',
    choices: removeDepartment.map((row) => ({name: row.departments}))
  });

  const selectedDepartment = departmentChoices.getdepartment

  db.query('DELETE FROM department WHERE ?', {name: selectedDepartment}, (err,res) => {
    if(err){
      console.log(err + "Remove Department funct")
    } else {
      console.log('Deleted Department Confirmed')
      return init();
    }
  });
};

const viewEmployees= () => {
  const view = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,'
  + ' department.name AS department FROM ((employee INNER JOIN role ON employee.role_id = role.id)'
  + ' INNER JOIN department ON role.department_id = department.id) ORDER BY department'

  db.query(view, (err,res) => {
    if(err){
      console.log(err + 'employee funct');
    } else {
      console.table(res);
      return init();
    }
  });
};

// const addEmployee = () => {

// }

// const deleteEmployee = () => {

// }

const viewRoles = () => {
  const view = 'SELECT role.title, role.department_id AS id, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title'

  db.query(view, (err,res) => {
    if(err){
      console.log(err + 'viewRoles funct');
    } else {
      console.table(res);
      return init();
    }
  });
}

// const updateRoles = () => {

// }

// const addRole= () => {

// }

