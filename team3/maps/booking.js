const map = ({ bookingId: id = 'abc', modelVersion } = {}) => {
  return {
    id,
    modelVersion
  };
};

module.exports = map;