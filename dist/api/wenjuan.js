"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function test(ctx, next) {
    let redis = ctx.redis;
    let visitorCnt = 1;
    let result = await redis.get('wenjuan_cnt');
    if (result) {
        visitorCnt = parseInt(result) + 1;
    }
    redis.set('wenjuan_cnt', visitorCnt);
    ctx.response.type = 'application/json';
    ctx.response.body = { code: 'SUCCESS', data: { visitorCnt } };
}
exports.test = test;
async function GET(ctx, next) {
    ctx.response.type = 'application/json';
    if (ctx.query.id) {
        let redis = ctx.redis;
        if (ctx.query.id === 'all') {
            if (ctx.query.token === '123321') {
                let lKey = await redis.keys('wenjuan_id_*');
                let lData = [];
                for (const key of lKey) {
                    let data = await redis.get(key);
                    lData.push(JSON.parse(data));
                }
                ctx.response.body = { code: 'SUCCESS', data: lData };
            }
            else {
                ctx.response.body = { code: 'FAIL', message: "token not match" };
            }
        }
        else {
            let key = `wenjuan_id_${ctx.query.id}`;
            let data = await redis.get(key);
            if (data) {
                ctx.response.body = { code: 'SUCCESS', data: JSON.parse(data) };
            }
            else {
                ctx.response.body = { code: 'FAIL', message: 'data not found' };
            }
        }
    }
    else {
        ctx.response.body = { code: 'FAIL', message: 'should pass query id' };
    }
}
exports.GET = GET;
async function POST(ctx, next) {
    let redis = ctx.redis;
    let body = ctx.request.body;
    let key = `wenjuan_id_${body.id}`;
    let data = JSON.stringify(body);
    await redis.set(key, data);
    ctx.response.type = 'application/json';
    ctx.response.body = { code: 'SUCCESS' };
}
exports.POST = POST;
