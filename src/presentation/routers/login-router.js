const { serverError, badRequest } = require('../helpers/http-response')

class LoginRouter {
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
  }
}

module.exports = LoginRouter
