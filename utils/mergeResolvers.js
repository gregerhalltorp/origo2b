const mergeResolvers = (...objectsToMerge) => {
  const merged = {};
  const normalized = Array.isArray(objectsToMerge) ? objectsToMerge : [objectsToMerge];
  normalized.filter(x => x).forEach(entry => {
    const normalizedEntry = Array.isArray(entry) ? entry : [entry];
    normalizedEntry.filter(x => x).forEach(object => {
      Object.keys(object).forEach(key => {
        merged[key] = {
          ...merged[key],
          ...object[key],
        };
      });
    });
  });
  return merged;
};

module.exports = mergeResolvers;
