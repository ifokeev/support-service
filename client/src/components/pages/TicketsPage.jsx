import merge from 'deepmerge';
import util from 'util';

import React, {
  Component
} from 'react';

import Sidebar from '../templates/Sidebar';
import TicketsTable from '../molecules/TicketsTable';

import {
  provideHooks
} from 'redial';

import {
  loadTickets,
  _filters,
  _sorts
} from '../../api/tickets'

import {
  observer,
  inject
} from 'mobx-react';

@provideHooks({
  fetch: ({
    store,
    query: {
      page,
      filters,
      sorts
    }
  }) => {
    let appliedFilters = {},
      appliedSorts = {};

    if (filters) {
      [...filters].forEach((i) => {
        appliedFilters = merge(appliedFilters, _filters[i].query);
      });
    }

    if (sorts) {
      [...sorts].forEach((i) => {
        appliedSorts = merge(appliedSorts, _sorts[i].query);
      });
    }

    return loadTickets(page, appliedFilters, appliedSorts).then((resp) => {
      return store('tickets').set('items', resp.data.items);
    });
  }
})
@inject('store') @observer
class TicketsPage extends Component {
  get items() {
    return this.props.store('tickets').get('items');
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <TicketsTable items={this.items} />
        </div>
      </div>
    );
  }
};

export default TicketsPage;
