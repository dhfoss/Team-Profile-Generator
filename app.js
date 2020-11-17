const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let i = 1;
const employeeArray = [];
let engineerNumbers;
let internNumbers;

const managerQuestions = [
    {
        name: "managerName",
        type: "input",
        message: "What is the Manager's name?"
    },
    {
        name: "managerId",
        type: "input",
        message: "What is the Manager's ID?"
    },
    {
        name: "managerEmail",
        type: "input",
        message: "What is the Manager's email?",
        default: () => {},
          validate: email => {
              let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
              if (valid) {
                  return true;
              } else {
                  console.log(".  Please enter a valid email")
                  return false;
              }
          }
    },
    {
        name: "managerOfficeNumber",
        type: "input",
        message: "What is the Manager's Office Number?"
    },
    {
        name: "numberOfEngineers",
        type: "input",
        message: "How many Engineers are on the team?",
        default: () => {},
        validate: value => {
            let valid = !isNaN(parseFloat(value));
            if (valid) {
                return true;
            } else {
                console.log(". Please enter a number")
            }
          }
    },
    {
        name: "numberOfInterns",
        type: "input",
        message: "How many Interns are on the team?",
        default: () => {},
        validate: value => {
            let valid = !isNaN(parseFloat(value));
            if (valid) {
                return true;
            } else {
                console.log(". Please enter a number")
            }
          }
    }
];

function managerPrompt() {
    inquirer.prompt(managerQuestions)
        .then(answers => {
            employeeArray.push(new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber));
            engineerNumbers = Number(answers.numberOfEngineers);
            internNumbers = Number(answers.numberOfInterns);
            engineerPrompt(answers.numberOfEngineers);
        })
        .catch(err => {
            if (err) throw err;
        });
}

function engineerPrompt(engineers) {
    if (i <= engineers) {
        inquirer.prompt([
            {
                name: "engineerName",
                type: "input",
                message: `What is engineer #${i}'s name?`
            },
            {
                name: "engineerId",
                type: "input",
                message: `What is engineer #${i}'s ID?`
            },
            {
                name: "engineerEmail",
                type: "input",
                message: `What is engineer #${i}'s email address?`,
                default: () => {},
                validate: email => {
                    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                    if (valid) {
                        return true;
                    } else {
                        console.log(".  Please enter a valid email")
                        return false;
                    }
                }
            },
            {
                name: "engineerGithub",
                type: "input",
                message: `What is engineer #${i}'s Github username?`
            }
        ])
        .then(answers => {
            employeeArray.push(new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub));
            i++;
            engineerPrompt(engineers);
        })
    } else {
        i = 1;
        internPrompt(internNumbers);
    }
}

function internPrompt(interns) {
    if (i <= interns) {
        inquirer.prompt([
            {
                name: "internName",
                type: "input",
                message: `What is intern #${i}'s name?`
            },
            {
                name: "internId",
                type: "input",
                message: `What is intern #${i}'s ID?`
            },
            {
                name: "internEmail",
                type: "input",
                message: `What is intern #${i}'s email address?`,
                default: () => {},
                validate: email => {
                    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                    if (valid) {
                        return true;
                    } else {
                        console.log(".  Please enter a valid email")
                        return false;
                    }
                }
            },
            {
                name: "internSchool",
                type: "input",
                message: `What is intern #${i}'s School?`
            }
        ])
        .then(answers => {
            employeeArray.push(new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool));
            i++;
            internPrompt(interns);
        })
    } else {
        fs.writeFile(outputPath, render(employeeArray), (err) => {
            if (err) throw err;
            console.log('Successfully wrote file in the ouput folder!')
        })
    }
}

managerPrompt();