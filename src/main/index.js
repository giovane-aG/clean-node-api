/**
 * Começar a implementar o módulo Main.
 * É o nosso Composition Root, onde devem ser criadas todas as instancias de nossas classes.
 * É onde inicializamos também a API. Irei instalar e configurar o Express e alguns middlewares.
*/

const express = require('express')
const app = express()

app.listen(5858, () => console.log('Server running'))
