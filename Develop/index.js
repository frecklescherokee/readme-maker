const inquirer = require('inquirer');
const fs = require('fs');

const generateMarkdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [

];

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter your name');
                  return false;
                }
            }
          },
        {
        type: 'input',
        name: 'title',
        message: 'What is the title of this application?',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter an application title');
              return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please enter an application description.',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter an application description.');
              return false;
            }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your github user name.');
              return false;
            }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your email address.');
              return false;
            }
        }
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the url to the deployed application.',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter the url to the deployed application.');
              return false;
            }
        }
      },
      {
        type: 'input',
        name: 'grepo',
        message: 'Enter the url to the github repo.',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter the url to the github repo.');
              return false;
            }
        }
      },
    //   {
    //     type: 'confirm',
    //     name: 'confirmAbout',
    //     message: 'Would you like to enter some information about yourself for an "About" section?',
    //     default: true
    //   },
    //   {
    //     type: 'input',
    //     name: 'about',
    //     message: 'Provide some information about yourself:',
    //     when: ({ confirmAbout }) => {
    //       if (confirmAbout) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   }
    ]);
  };

  const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./utils/README.md', fileContent, err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
  
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        resolve({
          ok: true,
          message: 'File created!'
        });
      });
    });
  };

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
// get user data
promptUser()
// then generate the content of the README file
.then(data => {
    return generateMarkdown(data);
})
// then write a README file with that content
.then(pageMarkdown => {
    return writeFile(pageMarkdown);
})
  // then catch errors
  .catch(err => {
    console.log(err);
  });

}

// function call to initialize program
init();
