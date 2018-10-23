'use strict'

const Router = require('koa-router')
const clients = require('./data/clients')
const { validate } = require('./utils/validation')
const log = require('./logger')

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hi from base route'
})

router.get('/clients', ctx => {
  ctx.body = clients
})

router.get('/clients/:id', ctx => {
  const client = clients.find(item => item.id === Number(ctx.params.id))

  if (!client) {
    ctx.status = 404
    log.warn('Client not found')
    return
  }

  ctx.body = client
})

router.post('/clients', ctx => {
  const schema = {
    type: 'Object',
    required: true,
    properties: {
      id: {
        type: 'integer',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      nick: {
        type: 'string',
        required: true,
      },
      ability: {
        type: 'string',
        required: true,
      },
      impairments: {
        type: 'array',
        required: true,
      },
    },
  }

  const validation = validate(ctx.request.body, schema)

  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }

    return
  }

  clients.push(ctx.request.body)

  ctx.body = clients
})

module.exports = router.routes()
