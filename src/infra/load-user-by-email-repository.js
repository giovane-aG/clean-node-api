const MongoHelper = require('./helpers/mongo-helper')
const MissingParamError = require('../utils/errors/missing-param-error')
class LoadUserByEmailRepository {
  async load (email) {
    if (!email) throw new MissingParamError('email')

    const db = await MongoHelper.getDb()

    const user = await db.collection('users').findOne({
      email
    }, {
      projection: {
        password: 1
      }
    })
    return user
  }
}

module.exports = LoadUserByEmailRepository
