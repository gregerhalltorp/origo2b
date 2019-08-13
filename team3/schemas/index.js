const { gql } = require('apollo-server');
const booking = require('./booking').schema;

const SchemaDefinition = gql`
  type Query {
    alive: String
  }
`;

module.exports = [SchemaDefinition, ...booking];
