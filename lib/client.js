import {makeConnection} from './utils';

/**
 * A Client wrapper for the chainlink smartoracles JSON RPC-API.
 * @type {Object}
 * @param {Object} options for connection to the oracle.  Defaults to:
 *   host=localhost, port=5100, key: none, secret: none
 */
export default class Client {
  constructor (options) {
    const merged = Object.assign(
      {
        host: 'http://localhost',
        port: 5100,
        key: null,
        secret: null
      },
      options
    );
    if (!(merged.key && merged.secret)) {
      throw new Error('ConfigurationError');
    }
    this.client = makeConnection(merged);
  }

  /**
   * Call the {@link https://chainlink-docs.smartcontract.com/#create Create Assignment endpoint} of the Oracle.
   *
   * @param  {Array<Object|Schedule>} subtasks the ordered subtasks to perform
   * @param  {Object} schedule (optional)
   * @param  {String} [version="1.0.0"] the version of the assignment
   * @return {Promise} Create Result
   */
  createAssignment (subtasks, schedule, version = '1.0.0') {
    const entity = {
      assignment: {
        subtasks, schedule
      },
      version
    };
    return this.client({
      method: 'POST',
      path: '/assignments',
      entity
    });
  }

  /**
   * Call the {@link https://chainlink-docs.smartcontract.com/#show Show Assignment endpoint} of the Oracle.
   * @param  {String} xid Assignment xid, as returned from `create`
   * @return {Promise} Assigment details
   */
  getAssignment (xid) {
    return this.client({
      method: 'GET',
      path: '/assignments'
    });
  }

  /**
   * Call the {@link https://chainlink-docs.smartcontract.com/#create8 Create Snapshot endpoint} for a specific `Assignment`.
   * @param  {String} xid Assignment xid
   * @return {Promise} Snapshot details
   */
  createSnapshot (xid) {
    return this.client({
      method: 'POST',
      path: `/assignments/${xid}/snapshots`
    });
  }

  /**
   * Call the {@link https://chainlink-docs.smartcontract.com/#show9 Show Snapshot endpoint} for a specific `Snapshot`.
   * @param  {String} xid Snapshot xid
   * @return {Promise} Snapshot details
   */
  getSnapshot (xid) {
    return this.client({
      method: 'GET',
      path: `/snapshots/${xid}`
    });
  }
}
