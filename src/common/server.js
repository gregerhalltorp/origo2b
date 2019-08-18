/* eslint-disable no-console */

import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import BH2DataSource from './datasources/BH2';

// TODO: Refaktorera strukturen till moduler istf. schema/resolvers
// TODO: Bryt ut datumtypen till en egen fil
// TODO: Testa att sluta extenda Query för att se om det går att slippa
// TODO: Undersök om https://github.com/okgrow/merge-graphql-schemas kan ge nåt här

// TODO: Byt till apollo-express
// TODO: Ta med bitarna från server i origo (header-grejer osv)

// TODO: Undersök hur en cache ska kunna funka

const dateThingy = gql`
  # Date according to general requirements
  type Date {
    # e.g. Mån 11 sep 2017
    long: String
    # e.g. 11 sep 2017
    longNoDay: String

    # Without day name e.g. 11 sep 2017
    short: String

    # e.g. 11
    day: String
    # e.g. Ons
    dayShortName: String
    # e.g. sep
    monthShortName: String
    # e.g. 2017
    year: String
    # Time as a tring e.g. 12:00
    time: String

    # e.g. 3
    month: String

    # Url date e.g. 20121028
    url: String

    # 2018-03-14T18:20:00
    raw: String
  }
`;

const server = (schemaModules, port = 4000) => {
  const apolloServer = new ApolloServer({
    schema: buildFederatedSchema([...schemaModules, { typeDefs: dateThingy }]),
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
