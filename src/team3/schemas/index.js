import { gql } from 'apollo-server';
import queryModules from './query';
import bookingModules from './booking';

export default [...queryModules, ...bookingModules];
