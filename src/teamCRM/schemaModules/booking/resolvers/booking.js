export const paymentResolver = async (booking, _, { dataSources: { BH2 } }) => {
  const paymentInfo = await BH2.getPaymentInformation(booking);
  return paymentInfo;
};
