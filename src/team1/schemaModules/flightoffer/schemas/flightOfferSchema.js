import { gql } from 'apollo-server';
import { valueIn } from '@tcne/react-utils/common';
import { flightOffersResolver } from '../resolvers/flightOffersResolver';

const typeDefs = gql`
  type Query {
    flightOffers(key: String filterInput: FlightOfferFilterInput): [FlightOffer!]!
  }

  enum BH2_TRIP_TYPES {
    PACKAGE
    FLIGHTONLY
  }

  input FlightOfferFilterInput {
    departureQuery: String
    destinationLocationQuery: [String!] = []
    departureDateFrom: String!
    ages: [Int] = [42,42]
    duration: Int
    sameRoom: Boolean = false
    nrOfFlightOffers: Int = 20
    tripTypes: [BH2_TRIP_TYPES] = [PACKAGE]
    selectedHotelCode: String
    nrOfHotelOffers: Int = 10
    departureCaId: [ID!]
    destinationCaId: [ID!]
    hotelId: ID
    destinationCode: String
  }

  type FlightDepartureMeta {
    code: String
  }

  type FlightDeparture {
    meta: FlightDepartureMeta
    key: String
    code: String
    name: String
    date: Date
  }

  type FlightHotel {
    name: String
    description: String
    id: ID
  }

  type Flight {
    flightKey: String
    departure: FlightDeparture
    hotel: FlightHotel
  }

  type FlightOffer {
    out: Flight
    home: Flight
  }
`;


const resolvers = {
  Query: {
    flightOffers: flightOffersResolver,
  },
  FlightOffer: {
    out: (flightOffer) => valueIn(flightOffer, '_embedded.out.0'),
    home: (flightOffer) => valueIn(flightOffer, '_embedded.home.0'),
  },
  Flight: {
    departure: (flight) => flight,
    flightKey: ({ flightKey }) => flightKey,
  },
  FlightDeparture: {
    meta: ({ providerKeys }) => providerKeys,
    key: ({ departureKey }) => departureKey,
    code: ({ providerKeys }) => valueIn(providerKeys, 'DepartureCode'),
    name: ({ departureName }) => departureName,
    date: ({ departureDateTimeLocal }) => departureDateTimeLocal,
  },
  FlightDepartureMeta: {
    code: ({ DepartureCode }) => DepartureCode,
  },
  FlightHotel: {
    name: ({ name2 }) => name2,
    description: ({ description2 }) => description2,
  },
};

export default [{ typeDefs, resolvers }];
