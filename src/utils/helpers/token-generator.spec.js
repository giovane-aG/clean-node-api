const jwt = require('jsonwebtoken')
class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  generate (id) {
    return jwt.sign(id, this.secret)
  }
}

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

  test('Should return token if JWT returns a token', () => {
    const sut = makeSut()
    const token = sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })

  test('Should JWT if correct values', () => {
    const sut = makeSut()
    sut.generate('any_id')
    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })
})
