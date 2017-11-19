'use strict';
import test from 'ava';
import {toTimestamp} from '../lib/utils';

test('toTimestamp should give current time with "now"', t => {
  const now = Math.round(new Date().getTime() / 1000);
  const check = toTimestamp('now');
  const possible = ['' + (now - 1), '' + now, '' + (now + 1)];
  t.true(possible.indexOf(check) > -1, 'message');
});

test('toTimestamp should give a timestamp for a date string', t => {
  t.is(toTimestamp('Sun, 19 Nov 2017 01:14:07 GMT'), '1511054047');
});
