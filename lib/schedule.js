import {toTimestamp} from './utils';

const FIELDS = [
  'minute',
  'hour',
  'dayOfMonth',
  'monthOfYear',
  'dayOfWeek',
  'startAt',
  'endAt',
  'runAt'
];

/**
 * A Schedule for an Assignment
 * @type {[type]}
 */
export default class Schedule {
  constructor (options) {
    this.schedule = {};

    FIELDS.forEach(field => {
      let val = options[field];
      if (val !== undefined && val !== null) {
        if (field === 'startAt' || field === 'endAt') {
          val = toTimestamp(val);
        } else if (field === 'runAt') {
          val = val.map(toTimestamp);
        }
        this.schedule[field] = val;
      }
    });

    if (!this.schedule.startAt) {
      this.schedule.startAt = toTimestamp('now');
    }
  }

  toJson () {
    return JSON.stringify(this.schedule);
  }
}
