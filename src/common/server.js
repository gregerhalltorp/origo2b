/* eslint-disable no-console */

import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import BH2DataSource from '../datasources/booking';
import querySchema from './querySchema';
import queryResolver from './queryResolver';

const server = (typeDefs, resolverMappings, port = 4000) => {
// { typeDefs: querySchema, resolvers: queryResolver },
// ...modules
// där modules exporteras från index i schemas, flytta bort resolvermappings från resolvers
// baka ihop till moduler
  const apolloServer = new ApolloServer({
    schema: buildFederatedSchema([
      { typeDefs: querySchema, resolvers: queryResolver },
      { typeDefs: typeDefs.booking, resolvers: resolverMappings.booking },
    ]),
    dataSources: () => ({
      BH2: new BH2DataSource(),
    }),
    tracing: true,
  });

  apolloServer.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

export default server;
