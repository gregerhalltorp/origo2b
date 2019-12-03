import { decode } from '@tcne/origo-utils/crypto';

export async function flightOffersResolver(_, { input }, context) {
  const { dataSources, marketUnit } = context;

  if (input.key) {
    const key = decode(input.key, context);
    return dataSources.BH2.getFlightOffersByKey(key);
  }


  const response = await dataSources.BH2.getFlightOffers(input, marketUnit);

  return response;
}
