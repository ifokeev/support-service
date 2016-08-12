import React, {
  Component
} from 'react';

import {
  Link
} from 'react-router';

import moment from 'moment';

import TicketsTableRow from '../atoms/TicketsTableRow';

class TicketsTable extends Component {
  get items() {
    return this.props.items;
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
          <tr>
            <th>User</th>
            <th>Title</th>
            <th>State</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {this.items.map((ticket, n) =>
              <TicketsTableRow key={ticket['_id']['$oid']} data={ticket} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
};

export default TicketsTable;
