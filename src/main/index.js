/**
 * Começar a implementar o módulo Main.
 * É o nosso Composition Root, onde devem ser criadas todas as instancias de nossas classes.
 * É onde inicializamos também a API. Irei instalar e configurar o Express e alguns middlewares.
*/
const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    app.listen(5858, () => console.log('Server Running on port 5858'))
  })
  .catch(console.error)
