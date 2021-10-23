const jwt = require('jsonwebtoken')
const TokenGenerator = require('./token-generator')
const { MissingParamError } = require('../errors')

const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')

    expect(token).toBeNull()
  })

  test('Should return token if JWT returns a token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })

  test('Should call JWT if correct values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })

  test('Should throw if no secret is provided', () => {
    const sut = new TokenGenerator()
    const promise = sut.generate('any_id')
    expect(promise).rejects.toEqual(new MissingParamError('secret'))
  })

  test('Should throw if no id is provided', () => {
    const sut = makeSut()
    const promise = sut.generate()
    expect(promise).rejects.toEqual(new MissingParamError('id'))
  })
})
