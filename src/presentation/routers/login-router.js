const { serverError, badRequest, unauthorizedError, ok } = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) return badRequest(new MissingParamError('email'))
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
