const fs = require('fs');

const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2); //save command text after 3 indeces

const [name, github] = profileDataArgs; //assign elements of array to variable names 


fs.writeFile('index.html', generatePage(name, github), err=>{ //1st file name, 2nd output file, 3rd handling errors
    if (err) throw new Error (err); //if error then stop execution of code

    console.log('Portfolio complete! Check out the index.html to see the output!');
});