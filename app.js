const inquirer = require('inquirer');

const { writeFile, copyFile } = require('./utils/generate-site.js');

const generatePage = require('./src/page-template.js');


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        { 
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username:',
            validate: gitName => {
                if (gitName){
                    return true;
                } else {
                    console.log('Please enter your Github username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        { 
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout}) => {
                if (confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
        },
    ]);
};

const promptProject = portfolioData =>{
    if (!portfolioData.projects){
        portfolioData.projects = [];
    }


    console.log(`
    ================
    Add a New Project
    ================
    `);
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: "Provide a description of the project:"
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'What is the link?'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject){ //if they say yes to adding another
            return promptProject(portfolioData); //call function again
        } else {
            return portfolioData; //otherwise return the answers
        }
    });
};



promptUser() //ask inquirer prompts
    .then(promptProject) //capture returning data
    .then(portfolioData => {
        return generatePage(portfolioData); //return HTML template code
    })
    .then(pageHTML => {
        return writeFile(pageHTML);//returns promise
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse); //log the resolve object message 
        return copyFile(); 
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse); //log the resolve object message
    })
    .catch(err => {
        console.log(err);
    });
    