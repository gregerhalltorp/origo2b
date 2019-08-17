import { gql } from 'apollo-server';
import { schema as bookingSchema, resolverMappings as bookingResolvers } from './booking';

export default [{ typeDefs: bookingSchema, resolvers: bookingResolvers }];
