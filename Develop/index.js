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
        type: 'confirm',
        name: 'confirmContribution',
        message: 'Would you like to enter some information about how to contribute to this application?',
        default: true
      },
      {
        type: 'input',
        name: 'contribution',
        message: 'Provide some information about how to contribute to this application:',
        when: ({ confirmContribution }) => {
          if (confirmContribution) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmLink',
        message: 'Would you like to enter the URL of the deployed application?',
        default: true
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the url to the deployed application.',
        when: ({ confirmLink }) => {
          if (confirmLink) {
            return true;
          } else {
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
      {
        type: 'confirm',
        name: 'confirmMit',
        message: 'Would you like to use the MIT license?',
        default: true
      },
      {
        type: 'confirm',
        name: 'confirmGnu',
        message: 'Would you like to use the GNU GPLv3 license?',
        when: ({ confirmMit }) => {
          if (!confirmMit) {
            return true;
          } else {
            return false;
          }
        }
      },

      {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Would you like to enter some information about tests for this application?',
        default: false,
      }
    ]);
  };

  
// this is just boilerplate text to see if the tests function was called
let promptTest = readmeData => {
    // If there's no 'tests' array property, create one
    if (!readmeData.tests) {
      readmeData.tests = [];
    } 
    
    return inquirer.prompt([
    
    {
      type: 'input',
      name: 'test',
      message: 'Enter how to test this application.',
      validate: testInput => {
        if (testInput) {
          return true;
        } else {
          console.log('Please enter a testing method.');
          return false;
        }
    }
    },
    {
      type: 'confirm',
      name: 'confirmAddTest',
      message: 'Would you like to enter another test?',
      default: false
    }
  ])
  .then(testData => {
    readmeData.tests.push(testData);
    if (testData.confirmAddTest) {
      return promptTest(readmeData);
    } else {
      return readmeData;
    }
  });
  
};


// function to write the readme file to its location
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



// function to initialize program
function init() {
// get user data
promptUser()
// then get test data
.then(data => {
  if (data.confirmTest) {
    return promptTest(data);
  }
  return data;
})
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
