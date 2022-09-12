const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
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
        'Add Role',
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
  + ' INNER JOIN department ON role.department_id = department.id) ORDER BY id'

  db.query(view, (err,res) => {
    if(err){
      console.log(err + 'employee funct');
    } else {
      console.table(res);
      return init();
    }
  });
};

async function addEmployee() { 
  const selectTitle = await db.query(
    'SELECT title, department_id FROM role'  
  )

  const checkManager = await db.query(
    'SELECT manager_name FROM employee'
  )

  const createEmployee = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is your first name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'What is your last name?',
      name: 'lastname',
    },
    {
      type: 'input',
      message: 'What is your job title?',
      name: 'jobtitle',
      choices: selectTitle.map((row) => ({name: row.title, value: row.department_id})),
    },
    {
      type: 'list',
      message: 'What is the name of your manager?',
      name: 'manager',
      choices: [
        'Ashley Rodriguez',
        'Teco Martinez',
        'John Smith',
        'Julia Romeo',
        'Alisson Peña',
      ]
    }
  ]);

  db.query('INSERT INTO employee SET ?', {
    first_name: createEmployee.name, last_name: createEmployee.lastname, roleID: createEmployee.jobtitle, manager_name: checkManager.manager, manager_id: false}, (err,res) => {
      if(err){
        console.log(err + 'AddEmployee func')
      }
      console.log('New Employee!')
      return init();
    })
} // 

 async function deleteEmployee() {
  const byeEmployee = await db.query(
    'SELECT first_name AS name, last_name AS lastName FROM employee'
  )

  const chooseEmployee = await inquirer.prompt ({
    type: 'list',
    message: 'What employee would like to fire?',
    name: 'employee',
    choices: byeEmployee.map((row) => ({name: row.name + ' ' + row.lastName}))
  });

  const selectedEmployee = chooseEmployee.employee.split(' ');
  console.log(selectedEmployee);

  db.query('DELETE FROM employee WHERE first_name = ? AND last_name = ?', selectedEmployee, (err,res) => {
    if(err){
      console.log(err)
    }
    console.log('Employee Deleted')
    return init();
  })
}

const viewRoles = () => {
  const view = 'SELECT role.title, role.department_id AS id, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY id'

  db.query(view, (err,res) => {
    if(err){
      console.log(err + 'viewRoles funct');
    } else {
      console.table(res);
      return init();
    }
  });
}

async function updateRoles() {
  const employeeData = await db.query(
    'SELECT first_name AS name, last_name AS lastName, id FROM employee'
  )

  const checkRoles = await db.query(
    'SELECT id, title, salary FROM role'
  )

  const updateRole = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee you want to update?',
      name: 'employee',
      choices: employeeData.map((row) => ({name: row.name + ' ' + row.lastName, value: row.id}))
    },
    {
      type: 'list',
      message: 'What new role you will assign?',
      name: 'update',
      choices: checkRoles.map((row) => ({name: row.title, value: row.id}))
    }
  ]);

  db.query(`UPDATE employee SET role_id = ${updateRole.update} WHERE id = ${updateRole.employee}`, (err,res) => {
    if(err){
      console.log(err + 'updateRoles funct')
    }
    console.log('Employee updated')
    return init();
  })
}

async function addRole() {
  const selectDepts = await db.query(
    'SELECT name, id FROM department'
  )

  const role = await inquirer.prompt([
    {
      type: 'list',
      message: 'What department is this role from?',
      name: 'choice',
      choices: selectDepts.map((row) => ({name: row.name, value: row.id}))
    },
    {
      type: 'input',
      message: 'What is the name of the new role?',
      name: 'title',
    },
    {
      type: 'number',
      message: 'What is the salary?',
      name: 'salary',
    }
  ]);

  db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${role.title}', '${role.salary}', '${role.choice}')`, (err,res) => {
    if(err){
      console.log(err)
    }
    console.log('Role Added')
    return init();
  })
}

