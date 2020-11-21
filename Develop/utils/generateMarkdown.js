// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  ${generateLicenseBadge(data.confirmMit, data.confirmGnu)}

## Description 
${data.description}
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