const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(403);
};

app.use(main);
app.listen(3000);
