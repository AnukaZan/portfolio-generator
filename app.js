const inquirer = require('inquirer');


// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', pageHTML, err=>{ //1st file name, 2nd output file, 3rd handling errors
//     if (err) throw err; //if error then stop execution of code

//     console.log('Portfolio complete! Check out the index.html to see the output!');
// });

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));