const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
// const HttpResponse = require('../helpers/http-response')

const makeSut = () => {
  class AuthUseCaseSpySpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const AuthUseCaseSpy = new AuthUseCaseSpySpy()
  const sut = new LoginRouter(AuthUseCaseSpy)

  return {
    sut,
    AuthUseCaseSpy
  }
}

describe('Login Router', () => {
  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'email@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCaseSpy with correct params', () => {
    const { sut, AuthUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'email@email.com',
        password: 'password'
      }
    }

    sut.route(httpRequest)
    expect(AuthUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(AuthUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 when invalid credetials are provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'invalid@email.com',
        password: 'invalid'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
  })
})
