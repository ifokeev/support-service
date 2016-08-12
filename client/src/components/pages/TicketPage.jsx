import React, {
  Component
} from 'react';

import {
  provideHooks
} from 'redial';

import {
  observer,
  inject
} from 'mobx-react';

import {
  loadTicket
} from '../../api/tickets'

import Ticket from '../organism/Ticket';
import Breadcrumbs from '../templates/Breadcrumbs';

@provideHooks({
  fetch: ({
    store,
    params: {
      id
    }
  }) => {
    return loadTicket(id).then((resp) => {
      store('tickets').set('selected', resp.data.items[0])
    });
  }
})
@inject('store') @observer
class TicketPage extends Component {
  get ticket() {
    return this.props.store('tickets').get('selected');
  }

  render() {
    return (
      <div>
        <div>
          <Breadcrumbs />
        </div>
        <div>
          <Ticket data={this.ticket}/>
        </div>
      </div>
    );
  }
};

export default TicketPage;
