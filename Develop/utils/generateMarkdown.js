// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  ${generateLicenseBadge(data.confirmMit, data.confirmGnu)}

## Description 
${data.description}
${generateUsage(data.confirmUsageVideo, data.usageVideoName, data.usageVideoLink, data.confirmUsageInstructions, data.usageInstructions)} 
${generateCredits(data.confirmCollaborators, data.collaborators, data.confirmApps, data.apps, data.confirmTutorials, data.tutorials)}
${generateTests(data.tests, data.confirmTest)}
${generateContribution(data.contribution)}
## Questions
For any questions, contact ${data.name} at ${data.email}.
Github: github.com/${data.github} 
${generateApplicatonLink(data.link)}
## Github Repo
${data.grepo}
${generateLicense(data.confirmMit, data.confirmGnu)}

`;
}



let generateUsage = (confirmUsageVideo, usageVideoName, usageVideoLink, confirmUsageInstructions, usageInstructions) => {
  if(!confirmUsageVideo && !confirmUsageInstructions) {
    return ''
  }

  
  let videoHeader = "";
  let videoName = "";
  let videoLink = "";
  if(confirmUsageVideo) {
    videoHeader = "### Usage Video"
    videoName = usageVideoName;
    videoLink = usageVideoLink;
  }

  //handle usage instructions
  let usageInstructionsHeader = "";
  if(confirmUsageInstructions) {
    usageInstructionsHeader = `

### Usage Instructions
`
    let usageInstructionNo = 0;
    var usageInstructionsArray = usageInstructions.map(usageInstructionData => {
    usageInstructionNo +=1;
    return "" + usageInstructionNo + ". " + usageInstructionData.usageInstruction + "";
  });
  }
  
  

  return `
## Usage
${videoHeader}
${videoName}
${videoLink}

${usageInstructionsHeader}
${usageInstructionsArray.join(`
`)}
`

};




let generateCredits = (confirmCollaborators, collaborators, confirmApps, apps, confirmTutorials, tutorials) => {
  //handle collaborators
  if(!confirmCollaborators) {
    return '';
  }
  
  let collaboratorNo = 0;
  const collaboratorsArray = collaborators.map(collaboratorData => {
    collaboratorNo +=1;
    return "" + collaboratorNo + ". " + collaboratorData.collaboratorName + ", " + collaboratorData.collaboratorRepo + "";
  });
  console.log(collaboratorsArray);

  //handle 3rd party applications
  if(!confirmApps) {
    return '';
  }
  let appNo = 0;

  const appsArray = apps.map(appData => {
    appNo +=1;
    return "" + appNo + ". " + appData.appName + ", creator: " + appData.creatorName + ", found at: " + appData.creatorLink + "";
  });
  console.log(appsArray);

  //handle tutorial videos
  if(!confirmTutorials) {
    return '';
  }
  let tutorialNo = 0;

  const tutorialsArray = tutorials.map(tutorialData => {
    tutorialNo +=1;
    return "" + tutorialNo + ". " + tutorialData.tutorialName + ", " + tutorialData.tutorialLink + "";
  });
  console.log(tutorialsArray);
  
  return `
## Credits
### Collaborators
${collaboratorsArray.join(`
`)}
### Third Party Applications
${appsArray.join(`
`)}
### Tutorials
${tutorialsArray.join(`
`)}
`
}




let generateTests = (tests, confirmTest) => {
  console.log("confirmTest = " + confirmTest);
  if(!confirmTest) {
    return '';
  }
  let testNo = 0;

  const testsArray = tests.map(testData => {
    testNo +=1;
    return "" + testNo + ". " + testData.test + "";
  });
  
  return `
## Tests
${testsArray.join(`
`)}`
}

let generateContribution = contribution => {
  if (contribution) {
    return `
## Contributing
${contribution}
`
  }
  return '';
}

let generateLicenseBadge = (mit, gnu) => {
  if (mit) {
    return `
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
`
  }
  if (gnu) {
    return `
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
`
  }
  return '';
}


let generateLicense = (mit, gnu) => {
  if (mit) {
    return `
## License
Licensed under the [MIT](LICENSE.txt) license.
`
  }
  if (gnu) {
    return `
## License
Licensed under the [GNU GPLv3](LICENSE.txt) license.
`
  }
  return '';
}


let generateApplicatonLink = (link) => {
  if (!link) {
    return'';
  }
  return `
## Application Link
${link}
`;
};

module.exports = generateMarkdown;