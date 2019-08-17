/* eslint-disable no-console */

import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import BH2DataSource from './datasources/booking';
import querySchema from './querySchema';
import queryResolver from './queryResolver';

const server = (schemaModules, port = 4000) => {
  const apolloServer = new ApolloServer({
    schema: buildFederatedSchema([
      { typeDefs: querySchema, resolvers: queryResolver },
      ...schemaModules,
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
