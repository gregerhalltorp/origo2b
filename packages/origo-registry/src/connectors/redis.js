import redis from 'redis';
import hash from '../utils/hash';
import { promisify } from 'util';
import { PerformanceObserver, performance } from 'perf_hooks';

// TODO: skriv test för det här!
// TODO: mer felhantering

const client = redis.createClient();
client.on('error', err => {
  // eslint-disable-next-line no-console
  console.err(`Redis error: ${err}`);
});

const hgetallAsync = promisify(client.hgetall).bind(client);
const hsetAsync = promisify(client.hset).bind(client);

// This function should not return - when the code is refactored it will only perform the write
// The calling function handles errors, which are simply missing arguments
// Thus, the api-endpoint should always return 200. Errors are handled separately
export async function pushSchema({ name, tag = 'common', schema } = {}) {
  const obs = new PerformanceObserver(items => {
    const entries = items.getEntries();
    console.log(entries[0].name, entries[0].duration);
    // performance.clearMarks();
  });
  obs.observe({ entryTypes: ['measure'] });
  performance.mark('A');
  // since this code will be duplicated between connectors, it should be abstracted to a higher level
  if (!name || !schema) {
    throw new Error('name and schema must be supplied to pushFunction');
  }
  const key = `${name}|${tag}`;
  performance.mark('B');
  performance.measure('made key', 'A', 'B');
  // Should the key be included in the hash? Think about that
  // Can this be constructed more neatly with a stream? Check express documentation etc.
  const schemaHash = hash(schema);
  performance.mark('C');
  performance.measure('hashed schema', 'B', 'C');
  const previousSchema = await hgetallAsync(key);
  performance.mark('D');
  performance.measure('got schema', 'C', 'D');
  const previousSchemaHash = previousSchema?.schemaHash;
  if (previousSchemaHash !== schemaHash) {
    await hsetAsync(key, [
      'name',
      name,
      'tag',
      tag,
      'schema',
      schema,
      'schemaHash',
      schemaHash,
    ]);
  }
  performance.mark('E');
  performance.measure(
    `${previousSchemaHash !== schemaHash ? 'wrote' : 'did not write'} schema`,
    'D',
    'E'
  );
  obs.disconnect();
}

// This function must indicate to caller that the supplied hash indicated present version
export async function getSchema({ name, tag = 'common', schemaHash } = {}) {
  // since this code will be duplicated between connectors, it should be abstracted to a higher level
  if (!name) {
    throw new Error('name and schema must be supplied to pushFunction');
  }
  const key = `${name}|${tag}`;
  const schema = await hgetallAsync(key);
  if (schema.schemaHash === schemaHash) {
    return false;
  }
  return schema;
}

export function exit() {
  client.quit();
}
