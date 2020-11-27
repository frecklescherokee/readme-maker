const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

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
      message: 'Will you be entering any information about tests for this application?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'confirmCollaborators',
      message: 'Will you be listing any collaborators?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmApps',
      message: 'Will you be listing any 3rd party application used on this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmTutorials',
      message: 'Will you be listing any tutorial video used on this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmUsageVideo',
      message: 'Will you be linking a video showing how to use this application?',
      default: false
    },
    {
      type: 'input',
      name: 'usageVideoName',
      message: 'Enter name of the video showing how to use this application.',
      when: ({ confirmUsageVideo }) => {
        if (confirmUsageVideo) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'usageVideoLink',
      message: 'Enter the link to the video showing how to use this application.',
      when: ({ confirmUsageVideo }) => {
        if (confirmUsageVideo) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmUsageInstructions',
      message: 'Will you be listing any usage instructions for this application?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmInstallationVideo',
      message: 'Will you be linking a video showing how to install this application?',
      default: false
    },
    {
      type: 'input',
      name: 'installationVideoName',
      message: 'Enter name of the video showing how to install this application.',
      when: ({ confirmInstallationVideo }) => {
        if (confirmInstallationVideo) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'installationVideoLink',
      message: 'Enter the link to the video showing how to install this application.',
      when: ({ confirmInstallationVideo }) => {
        if (confirmInstallationVideo) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmInstallationInstructions',
      message: 'Will you be listing any installation instructions for this application?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmFeatures',
      message: 'Will you be listing any information about the features of this application?',
      default: false
    }
  ]);
};

/////////////////// PROMPT TESTS /////////////////////////  
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

////////////////// GET COLLABORATORS ///////////////////////
let getCollaborators = readmeData => {
    // If there's no 'collaborators' array property, create one
    if (!readmeData.collaborators) {
      readmeData.collaborators = [];
    } 
    
    return inquirer.prompt([
    {
      type: 'input',
      name: 'collaboratorName',
      message: 'Enter the name of a collaborator.',
      validate: collaboratorInput => {
        if (collaboratorInput) {
          return true;
        } else {
          console.log('Please enter a collaborator.');
          return false;
        }
      } 
    },
    {
      type: 'input',
      name: 'collaboratorRepo',
      message: 'Enter the Github repo of this collaborator.',
      validate: collaboratorInput => {
        if (collaboratorInput) {
          return true;
        } else {
          console.log('Please enter the Github repo of this collaborator.');
          return false;
        }
      } 
    },
    {
      type: 'confirm',
      name: 'confirmAddCollaborator',
      message: 'Would you like to name another collaborator?',
      default: false
    }
  ])
  .then(collaboratorData => {
    readmeData.collaborators.push(collaboratorData);
    if (collaboratorData.confirmAddCollaborator) {
      return getCollaborators(readmeData);
    } else {
      return readmeData;
    }
  });
};
  
////////////////// GET APPS ///////////////////////
let getApps = readmeData => {
  // If there's no 'apps' array property, create one
  if (!readmeData.apps) {
    readmeData.apps = [];
  } 
  
  return inquirer.prompt([
  {
    type: 'input',
    name: 'appName',
    message: 'Enter name of the 3rd party app.',
    validate: appName => {
      if (appName) {
        return true;
      } else {
        console.log('Please enter the name of the 3rd party app.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'creatorName',
    message: 'Enter name of the 3rd party app creator.',
    validate: appName => {
      if (appName) {
        return true;
      } else {
        console.log('Please enter the name of the 3rd party app creator.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'creatorLink',
    message: 'Enter the link to the main web presence of the creator of the 3rd Party App.',
    validate: collaboratorRepo => {
      if (collaboratorRepo) {
        return true;
      } else {
        console.log('Please enter the link to the main web presence of the creator of the 3rd Party App.');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAdditionalApp',
    message: 'Would you like to enter another 3rd party app or app creator?',
    default: false
  }
  ])
  .then(appData => {
    readmeData.apps.push(appData);
    if (appData.confirmAdditionalApp) {
      return getApps(readmeData);
    } else {
      return readmeData;
    }
    });
}
  
////////////////// GET TUTORIALS ///////////////////////
let getTutorials = readmeData => {
  // If there's no 'tutorials' array property, create one
  if (!readmeData.tutorials) {
    readmeData.tutorials = [];
  } 
  
  return inquirer.prompt([
  
  {
    type: 'input',
    name: 'tutorialName',
    message: 'Enter name of the tutorial video.',
    validate: appName => {
      if (appName) {
        return true;
      } else {
        console.log('Please enter the name of the tutorial video.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'tutorialLink',
    message: 'Enter the link to the tutorial video.',
    validate: collaboratorRepo => {
      if (collaboratorRepo) {
        return true;
      } else {
        console.log('Please enter the link to the tutorial video.');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAdditionalTutorial',
    message: 'Would you like to enter another tutorial video?',
    default: false
  }
  ])
  .then(tutorialData => {
    readmeData.tutorials.push(tutorialData);
    if (tutorialData.confirmAdditionalTutorial) {
      return getTutorials(readmeData);
    } else {
      return readmeData;
    }
  });
}

////////////////// GET USAGE INSTRUCTIONS ///////////////////////
let getUsageInstructions = readmeData => {
  // If there's no 'tutorials' array property, create one
  if (!readmeData.usageInstructions) {
    readmeData.usageInstructions = [];
  } 
  
  return inquirer.prompt([
  {
    type: 'input',
    name: 'usageInstruction',
    message: 'Enter an instruction for this application.',
    validate: appName => {
      if (appName) {
        return true;
      } else {
        console.log('Please enter an instruction for this application.');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmUsageScreenshot',
    message: 'Would you like to show a screenshot of this instruction?',
    default: false
  },
  {
    type: 'input',
    name: 'usageScreenshotLink',
    message: 'Enter the url to a screenshot illustrating this instruction.',
    when: ({ confirmUsageScreenshot}) => {
      if (confirmUsageScreenshot) {
        return true;
      } else {
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAdditionalUsageInstruction',
    message: 'Would you like to enter another usage instruction?',
    default: false
  }
  ])
  .then(usageInstructionData => {
    readmeData.usageInstructions.push(usageInstructionData);
    if (usageInstructionData.confirmAdditionalUsageInstruction) {
      return getUsageInstructions(readmeData);
    } else {
      return readmeData;
    }
  });
}

////////////////// GET INSTALLATION INSTRUCTIONS ///////////////////////
let getInstallationInstructions = readmeData => {
  // If there's no 'installations instructions' array property, create one
  if (!readmeData.installationInstructions) {
    readmeData.installationInstructions = [];
  } 
  
  return inquirer.prompt([
  {
    type: 'input',
    name: 'installationInstruction',
    message: 'Enter an instruction for installation of this application.',
    validate: appName => {
      if (appName) {
        return true;
      } else {
        console.log('Please enter an instruction for installation of this application.');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmInstallationScreenshot',
    message: 'Would you like to show a screenshot of this instruction?',
    default: false
  },
  {
    type: 'input',
    name: 'installationScreenshotLink',
    message: 'Enter the url to a screenshot illustrating this instruction.',
    when: ({ confirmInstallationScreenshot}) => {
      if (confirmInstallationScreenshot) {
        return true;
      } else {
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAdditionalInstallationInstruction',
    message: 'Would you like to enter another installation instruction?',
    default: false
  }
  ])
  .then(installationInstructionData => {
    readmeData.installationInstructions.push(installationInstructionData);
    if (installationInstructionData.confirmAdditionalInstallationInstruction) {
      return getInstallationInstructions(readmeData);
    } else {
      return readmeData;
    }
  });
}

////////////////// GET FEATURES ///////////////////////
let getFeatures = readmeData => {
  // If there's no 'features' array property, create one
  if (!readmeData.features) {
    readmeData.features = [];
  } 
  
  return inquirer.prompt([
  {
    type: 'input',
    name: 'feature',
    message: 'Enter information about a feature of this application.',
    validate: appName => {
      if (appName) {
        return true;
      } else {
        console.log('Please enter information about a feature of this application.');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAdditionalFeature',
    message: 'Would you like to enter information about another feature?',
    default: false
  }
  ])
  .then(featureData => {
    readmeData.features.push(featureData);
    if (featureData.confirmAdditionalFeature) {
      return getFeatures(readmeData);
    } else {
      return readmeData;
    }
  });
}

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
//then get collaborator data
.then(data => {
  if (data.confirmCollaborators) {
    return getCollaborators(data);
  }
  return data;
})
// then get 3rd party apps data
.then(data => {
  if (data.confirmApps) {
    return getApps(data);
  }
  return data;
})
// then get tutorial video data
.then(data => {
  if (data.confirmTutorials) {
    return getTutorials(data);
  }
  return data;
})
// then get usage instructions data
.then(data => {
  if (data.confirmUsageInstructions) {
    return getUsageInstructions(data);
  }
  return data;
})
// then get installation instructions data
.then(data => {
  if (data.confirmInstallationInstructions) {
    return getInstallationInstructions(data);
  }
  return data;
})
// then get installation features data
.then(data => {
  if (data.confirmFeatures) {
    return getFeatures(data);
  }
  return data;
})

////////// print out data ////////////

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
