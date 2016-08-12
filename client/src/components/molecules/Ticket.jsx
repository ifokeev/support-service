import React, {
  Component
} from 'react';

import TicketBase from '../organism/TicketBase';
import Comments from './Comments';

import moment from 'moment';

class Ticket extends TicketBase {
  render() {
    let actionRender = (
      <div className="row" style={{marginTop: '10px'}}>
        <div className="col-xs-12 col-md-4">
          <button onClick={this.submitComment.bind(this)} className="btn btn-primary btn-block text-uppercase">Submit</button>
        </div>
        <div className="col-xs-12 col-md-offset-6 col-md-2">
          <button onClick={this.closeTicket.bind(this)} className="btn btn-success btn-block text-uppercase">Close Ticket</button>
        </div>
      </div>
    );

    if (this.ticket.state === 'closed') {
      actionRender = (
        <div className="row" style={{marginTop: '10px'}}>
          <div className="col-xs-12 col-md-offset-10 col-md-2">
            <button onClick={this.reopenTicket.bind(this)} className="btn btn-info btn-block text-uppercase">Reopen Ticket</button>
          </div>
        </div>
      );
    }

    return (
      <div className="ticket">
        <div className="ticket__header">
          <h4><span className={'label ' + this.getStateLabelClass(this.ticket.state)}>{this.ticket.state}</span> {this.ticket.title}</h4>
        </div>
        <div className="ticket__comment">
          <Comments items={this.ticket.comments} />
        </div>
        <div className="ticket__new-comment">
          <div className={'row' + (this.ticket.state === 'closed' ? ' hide' : '')}>
            <div className="col-xs-12">
              <textarea rows="3" ref="newComment" className="form-control"></textarea>
            </div>
          </div>
          {actionRender}
        </div>
      </div>
    );
  }
};

export default Ticket;
