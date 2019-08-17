import schema from './schemas';
import resolverMappings from './resolvers';
import server from '../common/server';

server(schema, resolverMappings, 4002);