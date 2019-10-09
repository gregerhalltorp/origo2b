import { decode } from '../../../../common/utils/crypto';

export async function flightOffersResolver(_, { key: encodedKey, filterInput }, context) {
  const { dataSources, marketUnit } = context;

  if (encodedKey) {
    const key = decode(encodedKey, context);
    return dataSources.BH2.getFlightOffersByKey(key);
  }

  const response = await dataSources.BH2.getFlightOffers(filterInput, marketUnit);

  return response;
}
