const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const serve = require('koa-static')
const cors = require('koa2-cors');
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const Decrypt = require('./Decrypt')
const ip = require('ip')

let buildPath = `sh ${process.cwd()}/build.sh`

const child_process = require('child_process');
class Serving {

    constructor() {
        this.app = new Koa()
        this.router = new Router();
        this.app.use(cors())
        this.app.use(bodyParser())
        // this.app.use(async (ctx, next) => {
            
        //     ctx.set('Access-Control-Allow-Headers', 'content-type');
        //     ctx.set('Access-Control-Allow-Credentials', true);
        //     ctx.set('Access-Control-Allow-Origin', ctx.get('Origin'));
        //     ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        //     ctx.vary('Origin')
        //     // 缓存OPTIONS
        //     ctx.set('Access-Control-Max-Age', 1728000);
        //     await next()
        // })
        this.app.use(serve((__dirname + '/dist')))
        this.routers()
    }

    routers() {
        this.router.post('/api/send/event', async (ctx, next) => {
            let {k} = ctx.request.body
            let {data} = new Decrypt(k)
            ctx.body = {
                code:200,
                data,
                message:''
            }
        })

        this.router.get('/api/build', async (ctx, next) => {
            console.log(buildPath)
            child_process.execFile(buildPath, [], { shell: '/bin/bash' }, (error, stdout, stderr) => {
                if(!error){
                    setTimeout(() => {
                    child_process.exec('pm2 restart serving',{encoding:'utf8'},()=>{})
                },1)
                }
            });
            ctx.body = {
                code:200,
                data:"",
                message:''
            }
        })
        this.router.all('/api/404', async (ctx, next) => {
            ctx.status = 500
            
        })
    }

    start() {
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
        if(process.env.EVENT == 'dev'){
            this.app.listen(7401, ip.address());
        }else{
            this.app.listen(7401, '172.16.100.38');
        }
        console.log(`服务启动成功 http://${ip.address()}:7401`)
    }

}

const serving = new Serving()
serving.start()