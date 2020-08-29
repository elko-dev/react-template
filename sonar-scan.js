const scanner = require('sonarqube-scanner');
 
scanner(
  {
    serverUrl : 'https://eab-sonarqube.herokuapp.com/',
    token : `${process.env.CODE_QUALITY_TOKEN}`,
    options: {
      'sonar.projectName': 'myapp',
      'sonar.projectDescription': 'myapp express project',
      'sonar.sources': 'src',
      "sonar.exclusions":"src/**/*.spec.ts",
      "sonar.test.inclusions":"src/**/*.spec.ts",
      'sonar.tests': 'src'
    }
  },
  () => process.exit()
)