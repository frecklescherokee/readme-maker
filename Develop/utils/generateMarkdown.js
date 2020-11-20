// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

  ## ${data.description}

  ## Questions
  For any questions, contact ${data.name} at ${data.email}.
  Github: github.com/${data.github} 

  ## Application Link
  ${data.link}

  ## Github Repo
  ${data.grepo}

`;
}

module.exports = generateMarkdown;
