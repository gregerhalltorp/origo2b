import server from '@tcne/origo-server';
import schemaModules from './schemaModules';
import dataSources from './datasources';

const { start, generateSchema } = server({
  schemaModules,
  dataSources,
  port: 4001,
});

if (~process.argv.slice(2).indexOf('--start')) {
  start();
} else {
  generateSchema();
}
