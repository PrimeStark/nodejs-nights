'use strict'

const Koa = require('koa')

const app = new Koa()

app.use(ctx => {
  ctx.body = 'Hi'
})

app.listen(3000, () => console.log('Server is up and running'))
