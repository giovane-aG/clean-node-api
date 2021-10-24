const { serverError, badRequest, unauthorizedError, ok } = require('../helpers/http-response')

const {
  MissingParamError,
  InvalidParamError
} = require('../../utils/errors')

class LoginRouter {
  constructor ({ authUseCase, emailValidator } = {}) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) return badRequest(new MissingParamError('email'))
      if (!this.emailValidator.isValid(email)) return badRequest(new InvalidParamError('email'))

      if (!password) return badRequest(new MissingParamError('password'))

      const token = await this.authUseCase.auth(email, password)

      if (!token) return unauthorizedError()

      return ok(token)
    } catch (error) {
      return serverError()
    }
  }
}

module.exports = LoginRouter
