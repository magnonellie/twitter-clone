const Koa = require('koa');
const Router = require('koa-router');
const { db, initDB } = require('./db.js');

const app = new Koa();

const router = new Router({
  prefix: '/api'
});

router.get('/', async ctx => {
  ctx.body = 'Welcome to the Twitter clone API!';
});

app.use(router.routes());
app.use(router.allowedMethods());

(async () => {
  try {
    await initDB();
    console.log('Database initialized');
  } catch (e) {
    console.error('Database initialization failed! Exiting...');
    console.error(e);
    process.exit(1);
  }
  app.context.db = db;
  app.listen(3000);
  console.log('Application listening on port 3000...');
})();
