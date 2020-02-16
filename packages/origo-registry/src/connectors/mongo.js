import { MongoClient } from 'mongodb';
import hash from '../utils/hash';

const url = 'mongodb://localhost:27017';
const dbName = 'origo-registry';
const client = new MongoClient(url, { useUnifiedTopology: true });
const connection = client.connect();
// TODO: implement this!
// Versioning: set field current on latest pushed version + updateMany current=false on others
//             extend API to allow queriyng over versions => can get other version...
//             use counter for versions instead of hash
//             let mongo set the id and query on name, tag, hash/version or current
//             how to solve for redis?
export async function pushSchema({ name, tag = 'common', schema } = {}) {
  await connection;
  const schemaHash = hash(schema);

  console.log('connected');
  const db = client.db(dbName);
  const collection = db.collection('schemas');
  await collection.replaceOne(
    { name, tag },
    {
      name,
      tag,
      schema,
      schemaHash,
    },
    {
      upsert: true,
    }
  );
}

export async function getSchema({ name, tag = 'common', schemaHash } = {}) {
  throw new Error('Not implemented yet');
}

export function exit() {
  client.close();
}
