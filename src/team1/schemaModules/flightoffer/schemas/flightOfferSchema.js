import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    flightOffers(): HotelwebHotel
  }

  type FlightOffer @key(fields: "id") {
    id: ID!
  }
`;

const resolvers = {
  Query: {
    
  },
};

export default [{ typeDefs, resolvers }];
