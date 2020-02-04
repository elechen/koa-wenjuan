import Koa = require('koa')
import Router = require('@koa/router')
import cors = require('@koa/cors')
import api = require('./api/api')
import redis = require('ioredis')
import bodyParser = require('koa-bodyparser')

const app = new Koa()
app.context.redis = new redis();

let router = new Router()
router.get('/', index)
    .all('/api/:action', api.dispatch)
async function index(ctx: Koa.ParameterizedContext) {
    ctx.response.type = 'text'
    ctx.response.body = 'Welcome to a Koa server'
}
app.use(cors())
app.use(bodyParser());
// app.use(async ctx => {
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   console.log(ctx.request.body)
//   // ctx.body = ctx.request.body;
// });
app.use(router.routes()).use(router.allowedMethods())

app.listen(8181)

console.log("server runs at http://localhost:8181")