const UnauthorizedError = require('./unauthorized-error')
const ServerError = require('./server-error')
const BadParamError = require('./bad-param-error')

class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }

  static badParamError () {
    return {
      statusCode: 400,
      body: new BadParamError()
    }
  }
}

module.exports = HttpResponse
