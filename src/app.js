'use strict'

// Koa and middleware
const Koa = require('koa')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const koaBody = require('koa-body')
// My server functions
const router = require('./router')
const log = require('./logger')

const app = new Koa()

app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(router)

app.listen(3000, () => log.info('Server is up and running'))
