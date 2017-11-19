'use strict';
import test from 'ava';
import Client from '../lib/client';

test('Client should be a class', t => {
  t.is(typeof (Client), 'function');
});
