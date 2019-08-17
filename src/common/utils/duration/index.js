const texts = {
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
  return {
    raw: `${hoursString}:${minutesString}:00`,
    hours,
    minutes,
    seconds: 0,
    display: `${hours} ${text.hour} ${minutes} ${text.minute}`,
  };
};

export default (stringInput, siteId) => {
  if (!stringInput) return { display: '' };

  const text = texts[siteId];
  if (!/\d\d:\d\d:\d\d/g.test(stringInput)) {
    throw new Error('Bad formated string ' + stringInput);
  }
  if (!text) {
    throw new Error('Invalid siteId');
  }
  const [hours, minutes, seconds] = stringInput.split(':').map(x => parseInt(x, 10));
  return {
    raw: stringInput,
    hours,
    minutes,
    seconds,
    display: `${hours} ${text.hour} ${minutes} ${text.minute}`,
  };
};
