export const extraGroupsResolver = async (
  booking,
  { views, extraGroupKeys },
  { dataSources: { BH2 } },
) => {
  const BOOKED_EXTRAS_GROUP = 'bookedExtrasGroup';
  const groupKeysToFetch = (extraGroupKeys || [])
    .filter((g) => g)
    .find((key) => key === BOOKED_EXTRAS_GROUP)
    ? null
    : extraGroupKeys;

  const extraOffersResult = await BH2.getExtraOffers(booking, views, groupKeysToFetch);
  // console.log(extraOffersResults);
  return null;
};
