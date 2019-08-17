const map = ({ bookingId: id = 'abc', modelVersion } = {}) => {
  console.log('hej');
  return {
    id,
    modelVersion,
  };
};

export default map;
