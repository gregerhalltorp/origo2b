/* eslint-disable class-methods-use-this, no-param-reassign */
import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLString } from 'graphql';
import { encode, decode } from '../utils/crypto';

export default class EncryptedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function resolveFn(
      source,
      { format, ...otherArgs },
      context,
      info,
    ) {
      const value = await resolve.call(this, source, otherArgs, context, info);

      return encode(value, context);
    };

    field.type = GraphQLString;
  }

  visitInputFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    console.log('visitInputFieldDefinition');
    console.log(field);

    field.resolve = () => 'DECRYPT_STRING';
    // field.resolve = async function resolveFn(
    //   source,
    //   { format, ...otherArgs },
    //   context,
    //   info,
    // ) {
    //   console.log('here');
    //   console.log(source);

    //   const value = await resolve.call(this, source, otherArgs, context, info);

    //   return decode(value, context);
    // };
  }
}
