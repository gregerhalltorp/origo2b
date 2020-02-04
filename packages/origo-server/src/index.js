import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import {
  buildFederatedSchema,
  printSchema as fedPrintSchema,
} from '@apollo/federation';
import { getMarketUnit, getVitsUser } from '@tcne/origo-utils/context';
import fs from 'fs';
import { printSchema } from 'graphql';

import commonSchemaModules from './schemaModules';
import commonDataSources from './datasources';

const server = ({
  schemaModules = [],
  dataSources = () => ({}),
  port = 4000,
} = {}) => {
  const schema = buildFederatedSchema([
    ...schemaModules,
    ...commonSchemaModules,
  ]);

  const anotherSchema = printSchema(schema);

  const serverConfig = {
    schema,
    tracing: true,
    reporting: true,
    // formatResponse: response => {
    //   // console.log(response.extensions.tracing.execution.resolvers);
    //   console.log(response.extensions.tracing.duration / 1000 ** 2);
    //   return response;
    // },
    // plugins: [
    //   {
    //     requestDidStart(requestContext) {
    //       console.log('requestDidStart', Object.keys(requestContext));
    //       console.log('request', requestContext.request);
    //       console.log('metrics', requestContext.metrics);
    //       console.log('debug', requestContext.debug);
    //       return {
    //         //   parsingDidStart(reqCon) {
    //         //     console.log('parsingDidStart', Object.keys(reqCon));
    //         //   },
    //         //   validationDidStart(reqCon) {
    //         //     console.log('validationDidStart', Object.keys(reqCon));
    //         //   },
    //         //   didResolveOperation(reqCon) {
    //         //     console.log('didResolveOperation', Object.keys(reqCon));
    //         //   },
    //         // executionDidStart(reqCon) {
    //         //   console.log('executionDidStart', Object.keys(reqCon));
    //         //   console.log(reqCon.metrics);
    //         //   console.log(reqCon.context);
    //         //   console.log(reqCon.request);
    //         // },
    //         //   didEncounterErrors(reqCon) {
    //         //     console.log('didEncounterErrors', Object.keys(reqCon));
    //         //   },
    //         willSendResponse(reqCon) {
    //           console.log('willSendResponse', Object.keys(reqCon));
    //           console.log(reqCon.metrics);
    //           console.log(reqCon.context);
    //           console.log(reqCon.request);
    //         },
    //       };
    //     },
    //   },
    // ],
    context: ({ req }) => {
      console.log(req.headers);
      const context = {};
      context.marketUnit = getMarketUnit(
        req.headers['x-origo-mucd'] || req.headers.marketunit
      );
      context.vitsUser = getVitsUser(req.headers, context.marketUnit);
      context.callerApp = req.headers['x-caller-app'];
      return context;
    },
  };
  serverConfig.dataSources = () => {
    return {
      ...commonDataSources(),
      ...dataSources(),
    };
  };

  const start = () => {
    const apolloServer = new ApolloServer(serverConfig);
    apolloServer.listen({ port }).then(({ url }) => {
      // eslint-disable-next-line no-console
      console.log(`🚀  Server ready at ${url}`);
    });
  };

  const generateSchema = () => {
    // TODO: merge with anotherSchema to include directives?
    console.log(anotherSchema);
    fs.writeFileSync('./new.graphql', fedPrintSchema(schema));
  }

  return {
    start,
    generateSchema,
  };
};

export default server;
export { printSchema } from 'graphql';
export { gql } from 'apollo-server';
