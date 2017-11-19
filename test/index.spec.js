'use strict';
import test from 'ava';
import {Client, Schedule} from '../lib';

test('Module should have both Client and Schedule', t => {
  t.truthy(Client, 'Client should not be falsy');
  t.truthy(Schedule, 'Schedule should not be falsy');
});
