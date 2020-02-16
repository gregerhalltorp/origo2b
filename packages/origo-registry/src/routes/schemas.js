import { plugins } from 'restify';

let server;

const handlerV1 = (req, res, next) => {
  res.send(200, {
    apiVersion: req.matchedVersion(),
    schemaVariants: ['acctest', 'prod'].map(name => ({
      name,
      href: `${server.url}${server.router.render('schemaVariant', {
        variant: name,
      })}`,
    })),
  });
  return next();
};

const route = srv => {
  server = srv;
  return [
    { name: 'schemas', url: '/api/schemas' },
    plugins.conditionalHandler([
      {
        version: '1.0.0',
        handler: handlerV1,
      },
    ]),
  ];
};

export default route;
