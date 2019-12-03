import server from '@tcne/origo-server';
import schemaModules from './schemaModules';
import dataSources from './datasources';

server({
  schemaModules,
  dataSources,
  port: 4001,
});
