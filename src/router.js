'use strict'

const Router = require('koa-router')

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hi from base route'
})

module.exports = router.routes()
