const jwt = require('jsonwebtoken')
class TokenGenerator {
  generate (id) {
    return jwt.sign(id, 'secret')
  }
}

const makeSut = () => {
  return new TokenGenerator()
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
})
