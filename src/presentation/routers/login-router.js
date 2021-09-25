const { serverError, badRequest } = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return serverError()
    }

    const { email, password } = httpRequest.body

    if (!email) {
      return badRequest('email')
    }

    if (!password) {
      return badRequest('password')
    }

    this.authUseCase.auth(email, password)
  }
}

module.exports = LoginRouter
