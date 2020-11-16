const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
        message: "What is the Manager's email?"
    },
    {
        name: "managerOfficeNumber",
        type: "input",
        message: "What is the Manager's Office Number?"
    },
    {
        name: "numberOfEngineers",
        type: "input",
        message: "How many Engineers are on the team?"
    },
    {
        name: "numberOfInterns",
        type: "input",
        message: "How many Interns are on the team?"
    }
];

let i = 1;

const engineerQuestions = [
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
        message: `What is engineer #${i}'s email address?`
    },
    {
        name: "engineerGithub",
        type: "input",
        message: `What is engineer #${i}'s Github username?`
    }
];

const internQuestions = [
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
        message: `What is intern #${i}'s email address?`
    },
    {
        name: "internSchool",
        type: "input",
        message: `What is intern #${i}'s School?`
    }
]

let managerObject;
let engineersInfo = [];
let internsInfo = [];
let engineerNumbers;
let internNumbers;

function managerPrompt() {
    inquirer.prompt(managerQuestions)
        .then(answers => {
            managerObject = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            engineerNumbers = answers.numberOfEngineers;
            internNumbers = answers.numberOfInterns;
            engineerPrompt(answers.numberOfEngineers);
        })
        .catch(err => {
            if (err) throw err;
        });
}

managerPrompt();

function engineerPrompt(engineers) {
    if (i <= Number(engineers)) {
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
                message: `What is engineer #${i}'s email address?`
            },
            {
                name: "engineerGithub",
                type: "input",
                message: `What is engineer #${i}'s Github username?`
            }
        ])
        .then(answers => {
            engineersInfo.push(new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub));
            i++;
            engineerPrompt(engineers);
        })
    } else {
        i = 1;
        internPrompt(internNumbers);
    }
}

function internPrompt(interns) {
    if (i <= Number(interns)) {
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
                message: `What is intern #${i}'s email address?`
            },
            {
                name: "internSchool",
                type: "input",
                message: `What is intern #${i}'s School?`
            }
        ])
        .then(answers => {
            internsInfo.push(new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool));
            i++;
            internPrompt(interns);
        })
    } else {
        console.log(managerObject);
        console.log(engineersInfo);
        console.log(internsInfo);
    }
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
