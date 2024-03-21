const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const slow = require('koa-slow');
const { faker } = require('@faker-js/faker');

const app = new Koa();
const router = new Router();

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(slow({
  delay: 5000
}));

function createFakeNews() {
  return {
      title: faker.lorem.sentence(3),
      imgSrc: faker.image.urlLoremFlickr({ width: 150, height: 100, category: 'film' }),
      description: faker.lorem.paragraph(5),
  }
}

function getLastNews() {
  return faker.helpers.multiple(createFakeNews, { count: 3 })
}


router.get('/news', (ctx) => {
  ctx.response.body = getLastNews();
  ctx.response.status = 200;
});

const port = process.env.PORT || 7070;
app.listen(port);
