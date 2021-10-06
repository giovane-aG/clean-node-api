class UnauthorizedError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'UnauthorizedError'
  }
}

module.exports = UnauthorizedError
