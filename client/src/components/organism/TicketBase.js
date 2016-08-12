import React, {
  Component
} from 'react';

import {
  observer
} from 'mobx-react';

import {
  observable,
  asReference
} from 'mobx';

import {
  newComment,
  closeTicket,
  reopenTicket
} from '../../api/tickets';

@observer
class TicketBase extends Component {
  @observable ticket = asReference({});
  
  constructor(props) {
    super(props);

    this.ticket = props.data;
  }

  componentWillReceiveProps(nextProps) {
    this.ticket = nextProps.data;
  }

  get ticketId() {
    return this.ticket['_id']['$oid'];
  }

  reopenTicket() {
    reopenTicket(this.ticketId).then((resp) => {
      this.ticket = resp.data.items[0];
    });
  }

  closeTicket() {
    closeTicket(this.ticketId).then((resp) => {
      this.ticket = resp.data.items[0];
    });
  }

  submitComment() {
    const commentRef = this.refs.newComment;
    
    const payload = {
      content: commentRef.value,
      author_id: "support"
    };

    newComment(this.ticketId, payload).then((resp) => {
      this.ticket = resp.data.items[0];
      commentRef.value = '';
    });
  }

  getStateLabelClass(state) {
    let className = '';

    switch (state) {
      case 'new':
        className = 'label-warning';
        break

      case 'pending':
        className = 'label-info';
        break

      case 'closed':
        className = 'label-success';
        break

      default:
        className = 'label-default';
    }

    return className;
  }
}

export default TicketBase;
