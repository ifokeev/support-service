import React, {
  Component
} from 'react';

import {
  Link
} from 'react-router';

import moment from 'moment';

import TicketBase from '../organism/TicketBase';

class TicketsTableRow extends TicketBase {
  render() {
    return (
      <tr>
        <td>{this.ticket.comments && this.ticket.comments.length && this.ticket.comments[0].author_id}</td>
        <td>{this.ticket.title}</td>
        <td><span className={'label '+ this.getStateLabelClass(this.ticket.state)}>{this.ticket.state}</span></td>
        <td><span title={this.ticket.created_at}>{moment(this.ticket.created_at).fromNow()}</span></td>
        <td><span title={this.ticket.updated_at}>{moment(this.ticket.updated_at).fromNow()}</span></td>
        <td><Link to={'/dashboard/tickets/' + this.ticket['_id']['$oid']}>Open</Link></td>
      </tr>
    );
  }
};

export default TicketsTableRow;
