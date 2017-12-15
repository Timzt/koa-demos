const Koa = require('koa');
const bodyParser = require('koa-bodyparser');//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
const Router = require('koa-router');
const compose = require('koa-compose');

const app = new Koa();
app.use(bodyParser());
const router = new Router({
	prefix:'/main'
});
router.get('/',(ctx,next) => {
	// ctx.set('Content-Type', 'text/html')
	// ctx.set('charset', 'utf-8')
	 ctx.response.type = 'html';
	ctx.response.body='欢迎来到首页<a href="/main/newLogin">请登录</a>'
})
.get('/link',async (ctx,next) => {
	const start = Date.now();
	ctx.response.body='333333';
	await next();//必须跟着async
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
	ctx.redirect('back','/main/login');
	
})
.get('/login',async (ctx,next) => {
	ctx.response.body='login';
	await next();//必须跟着async
})
.get('nameRouter' ,'/link/:id' , async (ctx , next) => {
	ctx.response.body=`nameRouter ${ctx.params.id}`;

	await next();
})
.get('/newLogin', async (ctx, next) => {
    ctx.response.body =`<h1>Index</h1>
        <form action="/main/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit" name='gender' id='gender'></p>
        </form>`;
        console.log('newLogin进入')
        await next();
})
.all('/signin', async (ctx, next) => {
	console.log('signin进入')
	//console.log(`signin with name: ${name}, password: ${password}`);
	var
        name = ctx.request.body.name || ''|| localStorage.getItem('userName'),
        password = ctx.request.body.password || '';
    	if (name === 'koa' && password === '12345' || ctx.cookies.get('token')) {
    		var userName=localStorage.setItem('userName',name)
	    	ctx.cookies.set('token','koaLogin',{
	    		expires: new Date('2017-12-17'),
	    		overwrite: false
	    	})
	        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
	    } else if(ctx.cookies.get('token') == undefined || ctx.cookies.get('token') == '' || name == '' || password == '') {
	        ctx.response.body = `<h1>Login failed!</h1>
	        <p><a href="/main/newLogin">Try again</a></p>`;
	    }    
});
// router.url('/limit' , {id:3})
router.param('users' , (id,ctx,next) => {
	ctx.user=user[id];
	if(!ctx.user) return ctx.status = 404;
	return next();
})
app.use(router.routes())
	.use(router.allowedMethods())
app.listen(3000,()=>{
	console.log('[demo] cookie is starting at port 3000')
});
