export const texts = {
  1: {
    hour: 'tim',
    minute: 'min',
  },
  3: {
    hour: 't',
    minute: 'min',
  },
  11: {
    hour: 't.',
    minute: 'min',
  },
  15: {
    hour: 'h',
    minute: 'min',
  },
  18: {
    hour: 'tim',
    minute: 'min',
  },
};

export const getDurationFromMinutes = (minutesIn, siteId) => {
  if (!minutesIn || +minutesIn !== +minutesIn) {
    throw new Error(
      `Provided timespan in wrong format: "${minutesIn}". Should be a number`
    );
  }

  const text = texts[siteId];
  if (!text) {
    throw new Error('Invalid siteId');
  }
  const hours = Math.floor(minutesIn / 60);
  const minutes = minutesIn % 60;
  let hoursString = hours.toString();
  if (hoursString.length === 1) {
    hoursString = `0${hoursString}`;
  }
  let minutesString = minutes.toString();
  if (minutesString.length === 1) {
    minutesString = `0${minutesString}`;
  }
  return durationHelper(`${hoursString}:${minutesString}:00`, siteId);
};

export const durationHelper = (stringInput, siteId) => {
  if (!stringInput) return { display: '' };

  const text = texts[siteId];
  if (!/\d\d:\d\d:\d\d/g.test(stringInput)) {
    throw new Error(
      `Input string in wrong format: "${stringInput}". Should be hh:mm:ss`
    );
  }
  if (!text) {
    throw new Error('Invalid siteId');
  }
  const [hours, minutes, seconds] = stringInput
    .split(':')
    .map(x => parseInt(x, 10));
  return {
    raw: stringInput,
    hours,
    minutes,
    seconds,
    display: `${hours} ${text.hour} ${minutes} ${text.minute}`,
  };
};
