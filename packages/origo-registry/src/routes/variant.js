import { plugins } from 'restify';

let server;

const handlerV1 = (req, res, next) => {
  res.send(200, {
    apiVersion: req.matchedVersion(),
    name: req.params.variant,
    schemaVersions: ['current', 1, 2, 3, 4, 5].map(version => {
      console.log(version, req.params.variant);
      return {
        version,
        href: `${server.url}${server.router.render('schemaVariantVersion', {
          variant: req.params.variant,
          version,
        })}`,
      };
    }),
  });
  return next();
};

const route = srv => {
  server = srv;
  return [
    { name: 'schemaVariant', url: '/api/schemas/:variant' },
    plugins.conditionalHandler([
      {
        version: '1.0.0',
        handler: handlerV1,
      },
    ]),
  ];
};

export default route;
