const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const main = async function(ctx) {
  const body = ctx.request.body;
  ctx.body = { name: body.name };
  // console.log(ctx.response.body)
  if (!body.name) 
  	{
  		ctx.throw(400, '.name required')
  	}else{
  		console.log(body.name)
  	}
};

// 先执行 当前目录下 node 20.js
// 然后伪造POST 值 curl -X POST --data "name=Timzt" 127.0.0.1:3000
// 浏览器重新进入一下，原先执行node 20.js的dos上 就会输出 Timzt
app.use(koaBody());
app.use(main);
app.listen(3000);
