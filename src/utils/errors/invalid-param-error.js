class InvalidParamError extends Error {
  constructor (paramName) {
    super(`Please enter a valid ${paramName}`)
    this.name = 'InvalidParamError'
  }
}

module.exports = InvalidParamError
