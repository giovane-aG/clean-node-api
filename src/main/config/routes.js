const router = require('express').Router()
const fb = require('fast-glob')

// Estamos modularizando as rotas para evitar um arquivo gigantesco
// Para isso criamos um router e para cada módulo estabelecemos um prefixo referente a esse módulo.

module.exports = app => {
  app.use('/api', router)
  fb.sync('**/src/main/routes/**.js').forEach(file => require(`../../../${file}`)(router))
}
