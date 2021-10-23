const jwt = require('jsonwebtoken')
class TokenGenerator {
  generate (id) {
    return jwt.sign(id, 'secret')
  }
}

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = new TokenGenerator()
    jwt.token = null
    const token = await sut.generate('any_id')

    expect(token).toBeNull()
  })

  test('Should return token if JWT returns a token', () => {
    const sut = new TokenGenerator()
    const token = sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })
})