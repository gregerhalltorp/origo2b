/* eslint-disable no-console */

import { tryCatch } from '@tcne/react-utils/common';
import { performance } from 'perf_hooks';

import {
  pushSchema as redisPushSchema,
  getSchema as redisGetSchema,
  exit as redisExit,
} from './connectors/redis';
import {
  pushSchema as mongoPushSchema,
  getSchema as mongoGetSchema,
  exit as mongoExit,
} from './connectors/mongo';

async function redisTest() {
  let hash;
  const name = 'booking';
  const tag = 'acctest';
  const schema = 'det här är ett test';
  let before = Date.now();
  await redisPushSchema({ name, tag, schema });
  const timerPush1 = Date.now() - before;
  before = Date.now();
  const result = await redisGetSchema({ name, tag });
  const timerGet1 = Date.now() - before;
  hash = result.schemaHash;
  before = Date.now();
  const newResult = await redisGetSchema({ name, tag, schemaHash: hash });
  const timerGet2 = Date.now() - before;
  before = Date.now();
  await redisPushSchema({ name, tag, schema: 'nytt test' });
  const timerPush2 = Date.now() - before;
  before = Date.now();
  const newResult2 = await redisGetSchema({ name, tag, schemaHash: hash });
  const timerGet3 = Date.now() - before;
  console.log('pushed to redis 1', timerPush1);
  console.log('got from redis 1', timerGet1);
  console.log('got from redis 2', timerGet2);
  console.log('pushed to redis 2', timerPush2);
  console.log('got from redis 3', timerGet3);
  redisExit();
}

async function mongoTest() {
  let hash;
  const name = 'booking';
  const tag = 'acctest';
  const schema = 'det här är ett test';
  let before = Date.now();
  await tryCatch(() => mongoPushSchema({ name, tag, schema }));
  const timerPush1 = Date.now() - before;
  before = Date.now();
  const [e1, result] = await tryCatch(() => mongoGetSchema({ name, tag }));
  const timerGet1 = Date.now() - before;
  hash = result?.schemaHash ?? '';
  before = Date.now();
  const [e2, newResult] = await tryCatch(() =>
    mongoGetSchema({ name, tag, schemaHash: hash })
  );
  const timerGet2 = Date.now() - before;
  before = Date.now();
  await tryCatch(() => mongoPushSchema({ name, tag, schema: 'nytt test' }));
  const timerPush2 = Date.now() - before;
  before = Date.now();
  const [e3, newResult2] = await tryCatch(() =>
    mongoGetSchema({ name, tag, schemaHash: hash })
  );
  const timerGet3 = Date.now() - before;
  // console.log('pushed to redis 1', timerPush1);
  // console.log('got from redis 1', timerGet1);
  // console.log('got from redis 2', timerGet2);
  // console.log('pushed to redis 2', timerPush2);
  // console.log('got from redis 3', timerGet3);
  mongoExit();
}

redisTest();
mongoTest();
