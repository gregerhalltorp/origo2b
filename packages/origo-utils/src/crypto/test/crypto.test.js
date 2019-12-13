import { crypto } from '@tcne/react-utils/server';
import { encode, decode } from '..';

jest.mock('@tcne/react-utils/server', () => {
  return {
    __esModule: true,
    crypto: jest.fn(() => {
      return {
        encode: jest.fn(string => string.toUpperCase()),
        decode: jest.fn(string => {
          return string.toLowerCase();
        }),
      };
    }),
  };
});

describe('crypto', () => {
  const context = { callerApp: 'charterflow' };
  const input = 'teststring';
  const encodedInput = Buffer.from(input.toUpperCase(), 'utf8').toString(
    'base64'
  );
  describe('encode', () => {
    test('throws if no value to encode', () => {
      expect(() => {
        encode(undefined);
      }).toThrow(/Must provide value and context/);
    });

    test('throws if no context', () => {
      expect(() => {
        encode(input);
      }).toThrow(/Must provide value and context/);
    });

    test('throws if callerApp not in list', () => {
      expect(() => {
        encode(input, {});
      }).toThrow(/Invalid caller app/);

      expect(() => {
        encode(input, {});
      }).toThrow(/Invalid caller app/);
    });

    test('works well for corret inputs', () => {
      const encodedValue = encode(input, context);
      expect(encodedValue).toBe(encodedInput);
      expect(crypto.mock.results[0].value.encode.mock.calls.length).toBe(1);
      expect(crypto.mock.results[0].value.encode.mock.calls[0].length).toBe(1);
      expect(crypto.mock.results[0].value.encode.mock.calls[0][0]).toBe(input);
    });
  });

  describe('decode', () => {
    test('throws if no value to encode', () => {
      expect(() => {
        decode(undefined);
      }).toThrow(/Must provide value and context/);
    });

    test('throws if no context', () => {
      expect(() => {
        decode(input);
      }).toThrow(/Must provide value and context/);
    });

    test('throws if callerApp not in list', () => {
      expect(() => {
        decode(input, {});
      }).toThrow(/Invalid caller app/);

      expect(() => {
        decode(input, {});
      }).toThrow(/Invalid caller app/);
    });

    test('works well for corret inputs', () => {
      const decodedValue = decode(encodedInput, context);
      expect(decodedValue).toBe(input);
      expect(crypto.mock.results[0].value.decode.mock.calls.length).toBe(1);
      expect(crypto.mock.results[0].value.decode.mock.calls[0].length).toBe(1);
      expect(crypto.mock.results[0].value.decode.mock.calls[0][0]).toBe(
        input.toUpperCase()
      );
    });
  });
});
