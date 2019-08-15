import { gql } from 'apollo-server';
import { schema as booking } from './booking';

const SchemaDefinition = gql`
  type Query {
    alive: String
  }
`;

export default [SchemaDefinition, ...booking];
