# Team-Profile-Generator

## Table of Contents
[Description](https://github.com/dhfoss/Team-Profile-Generator/#description)  
[Installation](https://github.com/dhfoss/Team-Profile-Generator/#installation)  
[Usage](https://github.com/dhfoss/Team-Profile-Generator/#usage)  
[Demonstration](https://github.com/dhfoss/Team-Profile-Generator/#demonstration)  
[Tests](https://github.com/dhfoss/Team-Profile-Generator/#tests)  
[Questions](https://github.com/dhfoss/Team-Profile-Generator/#questions)

### Description
This is a Command Line Interface application designed for a manager of a software develpment team. It allows for the user to enter in personal information for themself and their employees, which will then be rendered into a fully stylled html file. 

### Installation
This app uses inquirer.js and jest. Run `npm install` in the command line to install these dependencies.

### Usage
To run the app, type `node app.js` in the command line. This initialize a series of prompts. The app first asks for information about the manager, including their name, id, email, office number, number of engineers, and number of interns. If the user types in an invalid email address, it will repeat the question until a valid one is entered. If the user puts in an invalid number for the number of employes, it will also repeat the question until a valid number is entered. Then the app will prompt the user for information on their employees.  For engineers, it will ask for their Github account, and for interns, it will ask for their school. When all the prompts are answered, a message will appear saying the html page has been created.  
![Terminal](/assets/screen-shots/1-CLI.png?raw=true "CLI")

A file called "team.html" will be created in the "output" folder. There is also an "assets" folder containing a stylesheet and photo for the new html page.  
![Output](/assets/screen-shots/2-output.png?raw=true "Output")

Here is a screenshot of the finished product:  
![Browser](/assets/screen-shots/3-browser.png?raw=true "Browser View")  

### Demonstration
https://drive.google.com/file/d/1S4ZHd6RzkNsIIGUXODFYrD7S70dsHIO4/view

### Tests
https://github.com/dhfoss/Team-Profile-Generator/tree/main/test

### Questions
For questions contact me at:  
Email: dhfoss89@gmail.com  
https://github.com/dhfoss
