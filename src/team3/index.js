import schemas from './schemas';
import resolverMappings from './resolvers';
import server from '../common/server';

server(schemas, resolverMappings, 4001);
