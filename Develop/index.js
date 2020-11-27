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

////////////////// PROMPT APPS ///////////////////////

// let promptApps = readmeData => {
  
//   return inquirer.prompt([
//   {
//     type: 'confirm',
//     name: 'confirmApps',
//     message: 'Would you like to enter a 3rd party application used on this project?',
//     default: false
//   }
//   ])
//   .then(readmeData => {
//     return readmeData;
//   });
//   };
  
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
    console.log(readmeData.apps);
    if (appData.confirmAdditionalApp) {
      return getApps(readmeData);
    } else {
      return readmeData;
    }
  });
  
  }

  ////////////////// PROMPT TUTORIALS ///////////////////////

// let promptTutorials = readmeData => {
  
//   return inquirer.prompt([
//   {
//     type: 'confirm',
//     name: 'confirmTutorials',
//     message: 'Would you like to enter a tutorial video used on this project?',
//     default: false
//   }
//   ])
//   .then(readmeData => {
//     return readmeData;
//   });
//   };
  
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
    console.log(readmeData.tutorials);
    if (tutorialData.confirmAdditionalTutorial) {
      return getTutorials(readmeData);
    } else {
      return readmeData;
    }
  });
  
  }


 
  
  ////////////////// GET USAGE VIDEO ///////////////////////
  let getUsageVideo = readmeData => {
    if (!readmeData.confirmUsageVideo) {
      return readmeData;
    }
    
    return inquirer.prompt([
    
    {
      type: 'input',
      name: 'usageVideoName',
      message: 'Enter name of the video showing how to use this application.',
      validate: usageVideoName => {
        if (usageVideoName) {
          return true;
        } else {
          console.log('Please enter the name of the video showing how to use this application.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'usageVideoLink',
      message: 'Enter the link to the video showing how to use this application.',
      validate: usageVideoLink => {
        if (usageVideoLink) {
          return true;
        } else {
          console.log('Please enter the link to the video showing how to use this application.');
          return false;
        }
      }
    }

  ])
  .then(readmeData => {
    console.log(readmeData.usageVideoName);
    console.log(readmeData.usageVideoLink);
    return readmeData;
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
    console.log(readmeData.usageInstructions);
    if (usageInstructionData.confirmAdditionalUsageInstruction) {
      return getUsageInstructions(readmeData);
    } else {
      return readmeData;
    }
  });
  
  }


  
  ////////////////// GET INSTALLATION VIDEO ///////////////////////
  let getInstallationVideo = readmeData => {
    
    return inquirer.prompt([
    
    {
      type: 'input',
      name: 'installationVideoName',
      message: 'Enter name of the video showing how to install this application.',
      validate: usageVideoName => {
        if (usageVideoName) {
          return true;
        } else {
          console.log('Please enter the name of the video showing how to install this application.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'installationVideoLink',
      message: 'Enter the link to the video showing how to install this application.',
      validate: installationVideoLink => {
        if (installationVideoLink) {
          return true;
        } else {
          console.log('Please enter the link to the video showing how to install this application.');
          return false;
        }
      }
    }

  ])
  .then(readmeData => {
    console.log(readmeData.installationVideoName);
    console.log(readmeData.installationVideoLink);
    return readmeData;
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
    console.log(readmeData.installationInstructions);
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
    console.log(readmeData.features);
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
    console.log("before test info, here's the data: " + data);
    console.log(data);
    return promptTest(data);
  }
  return data;
})
              // // then ask if user wants to list collaborators
              // .then(data => {
              //   console.log("after asking about collaborators, here's the data: " + data);
              //   console.log(data);
              //   return promptCollaborators (data);
              // })
//then get collaborator data
.then(data => {
  if (data.confirmCollaborators) {
    console.log("before collaborator info, here's the data: " + data);
    console.log(data);
    return getCollaborators(data);
  }
  return data;
})
              // // then ask if user wants to list 3rd party apps
              // .then(data => {
              //   return promptApps (data);
              // })
              // then get 3rd party apps data
.then(data => {
  if (data.confirmApps) {
    console.log("before apps info, here's the data: " + data);
    console.log(data);
    return getApps(data);
  }
  return data;
})
              // // then ask if user wants to list tutorial videos
              // .then(data => {
              //   return promptTutorials (data);
              // })
              // then get tutorial video data
.then(data => {
  if (data.confirmTutorials) {
    console.log("before tutorials info, here's the data: " + data);
    console.log(data);
    return getTutorials(data);
  }
  return data;
})
              // // then ask if user wants to provide a usage video
              // .then(data => {
              //   return promptUsageVideo (data);
              // })
              // then get usage video data
// .then(data => {
//   if (data.confirmUsageVideo) {
//     console.log("before usage video info, here's the data: " + data);
//     console.log(data);
//     return getUsageVideo(data);
//   }
//   return data;
// })
              // // then ask if user wants to provide usage instructions
              // .then(data => {
              //   return promptUsageInstructions (data);
              // })
              // // then get usage instructions data
.then(data => {
  if (data.confirmUsageInstructions) {
    console.log("before usage instructions info, here's the data: " + data);
    console.log(data);
    return getUsageInstructions(data);
  }
  return data;
})
              // // then ask if user wants to provide an installation video
              // .then(data => {
              //   return promptInstallationVideo (data);
              // })
              // // then get installation video data
// .then(data => {
//   if (data.confirmInstallationVideo) {
//     console.log("before installation video info, here's the data: " + data);
//     console.log(data);
//     return getInstallationVideo(data);
//   }
//   return data;
// })
              // // then ask if user wants to provide installation instructions
              // .then(data => {
              //   return promptInstallationInstructions (data);
              // })
              // then get installation instructions data
.then(data => {
  if (data.confirmInstallationInstructions) {
    console.log("before installation instructions info, here's the data: " + data);
    console.log(data);
    return getInstallationInstructions(data);
  }
  return data;
})
              // // then ask if user wants to provide info about features
              // .then(data => {
              //   return promptFeatures (data);
              // })
              // then get installation features data
.then(data => {
  if (data.confirmFeatures) {
    console.log("before features info, here's the data: " + data);
    console.log(data);
    return getFeatures(data);
  }
  return data;
})

////////// print out data ////////////

// then generate the content of the README file
.then(data => {
  console.log("about to send data to readme file:");
  console.log(data);
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
