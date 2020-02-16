import { createServer, plugins } from 'restify';
import base from './routes/base';
import schemas from './routes/schemas';
import variant from './routes/variant';

const server = createServer();
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(plugins.gzipResponse());

// Use conditionalRequest plugin and ETags? Pretty much what we're doing if no specific version is requested
// TODO: implement CORS? Maybe not needed if fetch doesn't respect Access-Control-Allow-Origin

const schemaVariantVersionDef = [
  { name: 'schemaVariantVersion', url: '/api/schemas/:variant/:version' },
  plugins.conditionalHandler([
    {
      version: '1.0.0',
      handler: (req, res, next) => {
        res.send({
          variant: req.params.variant,
          version: req.params.version,
        });
        return next();
      },
    },
  ]),
];

server.get(...base(server));
server.get(...schemas(server));
server.get(...variant(server));
server.get(
  { name: 'currentSchema', url: '/api/schemas/:variant/current' },
  plugins.conditionalHandler([
    {
      version: '1.0.0',
      handler: (req, res, next) => {
        res.send(200, { version: 'current' });
      },
    },
  ])
);
server.get(...schemaVariantVersionDef);
server.post(
  '/api/schemas',
  plugins.conditionalHandler([
    {
      version: '1.0.0',
      handler: (req, res, next) => {
        console.log(req.body);
        res.send(200);
        return next();
      },
    },
  ])
);

server.listen(8000, '127.0.0.1', () => {
  console.log(`${server.name} listening at ${server.url}`);
});
