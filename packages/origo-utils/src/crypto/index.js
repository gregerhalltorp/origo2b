import { crypto } from '@tcne/react-utils/server';

const charterflowInstance = crypto({
  key:
    'jdjdjdfy2736sdws45eeså90hfgefsewfd____giff udysgr757fs eydts3jd9201akiSDFDGqr2FWEFWDFWRF',
  seed: 234087527276645,
  hashOnly: true,
});

function encodeString(unencryptedText, instance) {
  return Buffer.from(instance.encode(unencryptedText), 'utf8').toString(
    'base64'
  );
}

function decodeString(encryptedText, instance) {
  return instance.decode(Buffer.from(encryptedText, 'base64').toString('utf8'));
}

function getInstance(app) {
  // eslint-disable-next-line default-case
  switch (app) {
    case 'charterflow':
      return charterflowInstance;
  }

  throw new TypeError('Invalid caller app');
}

export function encode(value, context) {
  const instance = getInstance(context.callerApp);

  return value && encodeString(value, instance);
}

export function decode(value, context) {
  const instance = getInstance(context.callerApp);

  return value && decodeString(value, instance);
}
