const Koa = require('koa');
const app = new Koa();

const one = (ctx, next) => {
  console.log('>> one1');
  next();
  console.log('<< one2');
}

const two = (ctx, next) => {
  console.log('>> two3');
  next();
  console.log('<< two4');
}

const three = (ctx, next) => {
  console.log('>> three5');
  next();
  console.log('<< three6');
}

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);
