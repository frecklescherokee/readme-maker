// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  ${generateLicenseBadge(data.confirmMit, data.confirmGnu)}

## Description 
${data.description}
## Table of Contents
${generateContents(data.grepo, data.confirmContribution, data.confirmLink, data.confirmMit, data.confirmGnu, data.confirmTest, data.confirmCollaborators, data.confirmApps, data.confirmTutorials, data.confirmUsageVideo, data.confirmUsageInstructions, data.confirmInstallationVideo, data.confirmInstallationInstructions, data.confirmFeatures)}
${generateFeatures(data.features, data.confirmFeatures)}
${generateInstallation(data.confirmInstallationVideo, data.installationVideoName, data.installationVideoLink, data.confirmInstallationInstructions, data.installationInstructions, data.confirmInstallationScreenshot, data.installationScreenshotLink)} 
${generateUsage(data.confirmUsageVideo, data.usageVideoName, data.usageVideoLink, data.confirmUsageInstructions, data.usageInstructions, data.confirmUsageScreenshot, data.usageScreenshotLink)} 
${generateCredits(data.confirmCollaborators, data.confirmApps, data.confirmTutorials)}
${generateCollaborators(data.confirmCollaborators, data.collaborators)}
${generateApps(data.confirmApps, data.apps)}
${generateTutorials(data.confirmTutorials, data.tutorials)}
${generateTests(data.tests, data.confirmTest)}
${generateContribution(data.contribution)}
${generateQuestions(data.name, data.email, data.github)}
${generateApplicatonLink(data.link)}
## Github-Repo
${data.grepo}
${generateLicense(data.confirmMit, data.confirmGnu)}

`;
}

/////////// GENERATE CONTENTS //////////////////
let generateContents = (grepo, confirmContribution, confirmLink, confirmMit, confirmGnu, confirmTest, confirmCollaborators, confirmApps, confirmTutorials, confirmUsageVideo, confirmUsageInstructions, confirmInstallationVideo, confirmInstallationInstructions, confirmFeatures) => {
  let contentsArray = [];
  let contentsNo = 0;

  if(confirmFeatures) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [Features](#features)");
  }
  if(confirmInstallationInstructions || confirmInstallationVideo) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [Installation](#installation)");
  }
  if(confirmUsageInstructions || confirmUsageVideo) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [Usage](#usage)");
  }
  if(confirmCollaborators || confirmApps || confirmTutorials) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [Credits](#credits)");
  }
  if(confirmTest) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [Tests](#tests)");
  }
  if(confirmContribution) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [Contributing](#contributing)");
  }
  if(confirmLink) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [Application link](#application)");
  }
  contentsNo += 1;
  contentsArray.push("" + contentsNo + ". [Github Repo](#github-repo)");
  if(confirmMit) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [License](#license)");
  }
  if(confirmGnu) {
    contentsNo +=1;
    contentsArray.push("" + contentsNo + ". [License](#license)");
  }

  return`
${contentsArray.join(`
`)}`
}


/////////// GENERATE FEATURES //////////////////
let generateFeatures = (features, confirmFeatures) => {
  console.log("confirmFeatures = " + confirmFeatures);
  if(!confirmFeatures) {
    return '';
  }
  let featureNo = 0;

  const featuresArray = features.map(featureData => {
    featureNo +=1;
    return "" + featureNo + ". " + featureData.feature + "";
  });
  
  return `
## Features
${featuresArray.join(`
`)}`
}


//////////////// GENERATE INSTALLATION ////////////////
let generateInstallation = (confirmInstallationVideo, installationVideoName, installationVideoLink, confirmInstallationInstructions, installationInstructions, confirmInstallationScreenshot, installationScreenshotLink) => {
  if(!confirmInstallationVideo && !confirmInstallationInstructions) {
    return ''
  }

  let videoHeader = "";
  let videoName = "";
  let videoLink = "";
  if(confirmInstallationVideo) {
    videoHeader = "### Usage Video"
    videoName = installationVideoName;
    videoLink = installationVideoLink;
  }

  //handle installation instructions
  let installationInstructionsHeader = "";
  if(confirmInstallationInstructions) {
    installationInstructionsHeader = `
### Installation Instructions`
    let installationInstructionNo = 0;
    var installationInstructionsArray = installationInstructions.map(installationInstructionData => {
    installationInstructionNo +=1;
    console.log("on instruction no. " + installationInstructionNo + ", the confirmInstallationScreenshot property is " + installationInstructionData.confirmInstallationScreenshot + "and the screenshot link is " + installationInstructionData.installationScreenshotLink + "");
    if(installationInstructionData.confirmInstallationScreenshot) {
      return "" + installationInstructionNo + ". " + installationInstructionData.installationInstruction + "" + installationInstructionData.installationScreenshotLink + "";
    }
    else 
    
    return "" + installationInstructionNo + ". " + installationInstructionData.installationInstruction + "";
  });
  };

  return `
## Installation
${videoHeader}
${videoName}
${videoLink}
${installationInstructionsHeader}
${installationInstructionsArray.join(`
`)}
`
};


//////////////// GENERATE USAGE ////////////////
let generateUsage = (confirmUsageVideo, usageVideoName, usageVideoLink, confirmUsageInstructions, usageInstructions, confirmUsageScreenshot, usageScreenshotLink) => {
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
### Usage Instructions`
    let usageInstructionNo = 0;
    var usageInstructionsArray = usageInstructions.map(usageInstructionData => {
    usageInstructionNo +=1;
    console.log("on instruction no. " + usageInstructionNo + ", the confirmUsageScreenshot property is " + usageInstructionData.confirmUsageScreenshot + "and the screenshot link is " + usageInstructionData.usageScreenshotLink + "");
    if(usageInstructionData.confirmUsageScreenshot) {
      return "" + usageInstructionNo + ". " + usageInstructionData.usageInstruction + "" + usageInstructionData.usageScreenshotLink + "";
    }
    else 
    
    return "" + usageInstructionNo + ". " + usageInstructionData.usageInstruction + "";
  });
  };

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

////////// GENERATE CREDITS HEADER
let generateCredits = (confirmCollaborators, confirmApps, confirmTutorials) => {

  console.log ("confirm Collaborators = " + confirmCollaborators);
  if(!confirmCollaborators && !confirmApps && !confirmTutorials) {
    return '';
  }
  else return `
## Credits`
}

////////// GENERATE COLLABORATORS /////////////////
let generateCollaborators = (confirmCollaborators, collaborators) => {
  if(!confirmCollaborators) {
    return '';
  }
  //handle collaborators
  let collaboratorNo = 0;
  const collaboratorsArray = collaborators.map(collaboratorData => {
    collaboratorNo +=1;
    return "" + collaboratorNo + ". " + collaboratorData.collaboratorName + " - [" + collaboratorData.collaboratorName + "](https://github.com/" + collaboratorData.collaboratorRepo + ")<br>";
  });
  console.log(collaboratorsArray);

  return `
### Collaborators
${collaboratorsArray.join(`
`)}
`
};

/////////// GENERATE APPS ///////////////////////
let generateApps = (confirmApps, apps) => {
  if(!confirmApps) {
    return '';
  }
  //handle 3rd party applications
  let appNo = 0;

  const appsArray = apps.map(appData => {
    appNo +=1;
    return "" + appNo + ". " + appData.appName + ", creator: " + appData.creatorName + ", found at: " + appData.creatorLink + "";
  });
  console.log(appsArray);
  
  return `
### 3rd Party Apps
${appsArray.join(`
`)}
`
};
  
///////////// GENERATE TUTORIALS /////////////////
let generateTutorials = (confirmTutorials, tutorials) => {
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
### Tutorials
${tutorialsArray.join(`
`)}
`
};

/////////// GENERATE TESTS //////////////////
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

///////////// GENERATE CONTRIBUTION //////////////
let generateContribution = contribution => {
  if (contribution) {
    return `
## Contributing
${contribution}
`
  }
  return '';
}

///////////// GENERATE LICENSE BADGE ///////////////
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

//////////// GENERATE LICENSE /////////////////////
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

//////////////// GENERATE QUESTIONS /////////////
let generateQuestions = (name, email, github) => {
  let githubLine = "Github: - [" + github + "](https://github.com/" + github + ")<br>";
  return`
## Questions
For any questions, contact ${name} at ${email}.

${githubLine}`
};

//////////// GENERATE APPLICATION LINK ///////////////
let generateApplicatonLink = (link) => {
  if (!link) {
    return'';
  }
  return `
## Application-Link
${link}
`;
};

module.exports = generateMarkdown;