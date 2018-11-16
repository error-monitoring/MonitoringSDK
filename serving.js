const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const serve = require('koa-static')
const cors = require('koa2-cors');
const convert = require('koa-convert')
class Serving {

    constructor() {
        this.app = new Koa()
        this.router = new Router();
        this.app.use(cors())
        this.app.use(convert(cors()))
        this.app.use(async (ctx, next) => {
            ctx.set('Access-Control-Allow-Credentials', true);
            // ctx.get('Origin')
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Content-type', 'text/javascript');
            ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            ctx.set("Vary", "Origin");
            ctx.vary('Origin')
            await next()
        })
        this.app.use(serve((__dirname + '/dist')))
        this.routers()
    }

    routers() {
        this.router.get('/test', async (ctx, next) => {
            const data = fs.readFileSync('./dist/monitoring-sdk.js', 'utf8');
            // ctx.set('Access-Control-Allow-Credentials', true);
            // ctx.set('Access-Control-Allow-Origin', ctx.get('Origin'));
            // ctx.set('Content-type', 'text/javascript');
            // ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            // ctx.set("Vary", "Origin");
            ctx.vary('Origin')


            ctx.body = data
        })
    }

    start() {
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
        this.app.listen(9090, '0.0.0.0');
        console.log('服务启动成功')
    }

}

const serving = new Serving()
serving.start()