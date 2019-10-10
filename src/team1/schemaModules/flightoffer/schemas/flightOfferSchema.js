import { gql } from 'apollo-server';
import { valueIn } from '@tcne/react-utils/common';
import { flightOffersResolver } from '../resolvers/flightOffersResolver';

const typeDefs = gql`

  extend type Query {
    flightOffers(input: FlightOfferFilterInput): FlightOffers!
  }

  enum BH2_TRIP_TYPES {
    PACKAGE
    FLIGHTONLY
  }

  type BookingHubPaginationLinks {
    prev: String @encrypted
    next: String @encrypted
  }

  type FlightOffers {
    flightOffers: [FlightOffer!]!
    pagination: BookingHubPaginationLinks!
  }

  input FlightOfferFilterInput {
    key: String @encrypted
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
    departureDate: Date
    arivalDate: Date
    flightTime: Duration
  }

  type Flight {
    flightKey: String
    departure: FlightDeparture
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
  FlightOffers: {
    flightOffers: (res) => valueIn(res, '_embedded.flight-offer', []),
    pagination: (res) => valueIn(res, '_links', {}),
  },
  BookingHubPaginationLinks: {
    prev: (links) => valueIn(links, 'previous.href'),
    next: (links) => valueIn(links, 'next.href'),
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
    departureDate: ({ departureDateTimeLocal }) => departureDateTimeLocal,
    arivalDate: ({ arrivalDateTimeLocal }) => arrivalDateTimeLocal,
  },
  FlightDepartureMeta: {
    code: ({ DepartureCode }) => DepartureCode,
  },
};

export default [{ typeDefs, resolvers }];
