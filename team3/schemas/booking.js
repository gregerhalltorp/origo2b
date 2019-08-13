const { gql } = require('apollo-server');
const bookingResolver = require('../resolvers/booking.js').booking;
const extraGroupResolver = require('../resolvers/booking').extraGroups;

const booking = gql`
  type Booking {
    id: ID!
    modelVersion: Int
    extraGroups: [PassengerExtraGroup]
  }

  type PassengerExtraGroup {
    id: ID!
    groupKey: ID!
    groupCode: ID!
    groupName: String!
  }
`;

const query = gql`
  extend type Query {
    booking(id: ID!): Booking
  }
`;

const resolverMappings = [
  {
    Query: {
      booking: bookingResolver,
    },
    Booking: {
      extraGroups: extraGroupResolver,
    },
  },
];

module.exports = {
  schema: [booking, query],
  resolverMappings,
};
