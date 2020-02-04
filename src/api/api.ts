import Koa = require('koa')
import wenjuan = require('./wenjuan')

export async function dispatch(ctx: Koa.ParameterizedContext, next) {
    const action = ctx.params.action
    switch (action) {
      case 'wenjuan':
        await wenjuan[ctx.method](ctx, next)
        break;
    
      default:
        ctx.response.type = 'text'
        ctx.response.body = 'hi vistor~'
    }
}