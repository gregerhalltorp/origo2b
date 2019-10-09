/* eslint-disable no-console */

import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
// import { RedisCache } from 'apollo-server-cache-redis';
// import responseCachePlugin from 'apollo-server-plugin-response-cache';
import BH2DataSource from './datasources/BH2';
import ContentDataSource from './datasources/ContentData';
import commonSchemaModules from './schemaModules';
import getMarketUnit from './utils/context/marketUnit';
import getVitsUser from './utils/context/vitsUser';

// TODO: Byt till apollo-server-express
// TODO: Ta med bitarna från server i origo (header-grejer osv)
// TODO: Implementera datumreducers för datum

// TODO: Undersök hur en cache ska kunna funka

const server = (schemaModules, port = 4000) => {
  const apolloServer = new ApolloServer({
    schema: buildFederatedSchema([...schemaModules, ...commonSchemaModules]),
    // cache: new RedisCache({
    //   host: 'localhost',
    // }),
    // plugins: [responseCachePlugin()],
    dataSources: () => ({
      BH2: new BH2DataSource(),
      ContentData: new ContentDataSource(),
    }),
    tracing: true,
    context: ({ req }) => {
      const context = {};
      context.marketUnit = getMarketUnit(req.headers['x-origo-mucd'] || req.headers.marketunit);
      context.vitsUser = getVitsUser(req.headers, context.marketUnit);
      context.callerApp = req.headers['x-caller-app'];
      return context;
    },
  });

  apolloServer.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

export default server;
