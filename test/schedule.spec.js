'use strict';
import test from 'ava';
import Schedule from '../lib/schedule';

test('Schedule should be a class', t => {
  t.is(typeof (Schedule), 'function');
});

test('Schedule should always have a startAt, even if not provided', t => {
  const s = new Schedule({minute: '*'});
  t.truthy(s.schedule.startAt);
  t.is(s.schedule.minute, '*');
});
