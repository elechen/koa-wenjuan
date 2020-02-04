"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wenjuan = require("./wenjuan");
async function dispatch(ctx, next) {
    const action = ctx.params.action;
    switch (action) {
        case 'wenjuan':
            await wenjuan[ctx.method](ctx, next);
            break;
        default:
            ctx.response.type = 'text';
            ctx.response.body = 'hi vistor~';
    }
}
exports.dispatch = dispatch;
