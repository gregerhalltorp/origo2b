import { plugins } from 'restify';

let server;

const handlerV1 = (req, res, next) => {
  res.send(200, {
    links: [
      {
        rel: 'self',
        href: `${server.url}${server.router.render('api')}`,
      },
      {
        rel: 'schemas',
        href: `${server.url}${server.router.render('schemas')}`,
      },
    ],
  });
  return next();
};

const route = srv => {
  server = srv;
  return [
    { name: 'api', url: '/api' },
    plugins.conditionalHandler([
      {
        version: '1.0.0',
        handler: handlerV1,
      },
    ]),
  ];
};

export default route;
