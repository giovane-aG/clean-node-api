
module.exports = {

  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb'

  // coverageProvider: 'v8'
}
