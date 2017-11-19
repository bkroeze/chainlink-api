import rest from 'rest';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';
import basicAuth from 'rest/interceptor/basicAuth';
import pathPrefix from 'rest/interceptor/pathPrefix';
import moment from 'moment';

/**
 * Create and return a `rest` client using the provided parameters
 * @param {Object} options object with host, port, key, and secret
 * @return {Object} rest client
 */
export function makeConnection (options) {
  const prefix = options.host + ':' + options.port;
  return rest
    .wrap(pathPrefix, { prefix })
    .wrap(basicAuth, {
      username: options.key,
      password: options.secret
    })
    .wrap(mime, { mime: 'application/json' })
    .wrap(errorCode);
}

/**
 * Converts `work` to a unix timestamp, if possible
 * @param  {String} work a date string, or "now"
 * @return {String} unix timestamp
 */
export function toTimestamp (work) {
  if (work.toUpperCase() === 'NOW') {
    return moment().format('X');
  } else {
    return moment(work).format('X');
  }
}
