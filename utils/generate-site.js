const fs = require('fs');

const writeFile = fileContent => {

    //create new promise object (container that lets the code start to run but waits for a response)
    //function that accepts two functions as parametercs
    //run resolve() function when code is successful, reject() if not
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err=>{ //1st file name, 2nd output file, 3rd handling errors
            
            // if error, reject adn send error to Promise catch method
            if (err) {
                reject(err);
                return; //return out of function to make Promise not execute resolve
            }
    
            //if everything went well, resolve Promise
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};


const copyFile = () =>{
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Stylesheet copied!'
            }); 
        });
    });
};



// module.exports = {
//     writeFile: writeFile,
//     copyFile: copyFile
// };

module.exports = { writeFile, copyFile};