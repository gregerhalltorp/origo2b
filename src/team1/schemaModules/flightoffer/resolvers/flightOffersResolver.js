import { decode } from '../../../../common/utils/crypto';

export async function flightOffersResolver(_, { input }, context) {
  const { dataSources, marketUnit } = context;

  console.log('flightOffersResolver');
  console.log(input.key);
  // if (encodedKey) {
  //   const key = decode(encodedKey, context);
  //   return dataSources.BH2.getFlightOffersByKey(key);
  // }

  const response = await dataSources.BH2.getFlightOffers(input, marketUnit);

  return response;
}
