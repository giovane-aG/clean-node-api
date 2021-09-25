const { serverError, badRequest, unauthorizedError, ok } = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return serverError()
    }

    const { email, password } = httpRequest.body

    if (!email) {
      return badRequest('email')
    }

    if (!password) {
      return badRequest('password')
    }

    const token = this.authUseCase.auth(email, password)

    if (!token) {
      return unauthorizedError()
    }

    return ok()
  }
}

module.exports = LoginRouter
