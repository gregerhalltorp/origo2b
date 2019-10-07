function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const hotelwebHotelMap = async (hotel = {}) => {
  await sleep(3000);

  return {
    wvId: hotel.wvId,
    name: hotel.name,
  };
};

export default hotelwebHotelMap;
