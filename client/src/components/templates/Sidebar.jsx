import React, {
  Component,
  PropTypes
} from 'react';

import {
  withRouter
} from 'react-router';

import {
  observer,
  inject
} from 'mobx-react';

import {
  observable,
  asReference
} from 'mobx';

import Checkbox from './Checkbox'
import Radio from './Radio'

import {
  _filters,
  _sorts
} from '../../api/tickets'

@withRouter @observer
class Sidebar extends Component {
  @observable filters = asReference([]);
  @observable sorts = asReference([]);

  constructor(props) {
    super(props);

    this.filters = _filters;
    this.syncCheckedWithQuery('filters');

    this.sorts = _sorts;
    this.syncCheckedWithQuery('sorts');
  }

  syncCheckedWithQuery(queryKey) {
    const {
      location
    } = this.props;

    if (location.query[queryKey]) {
      [...location.query[queryKey]].forEach((index) => {
        if (this[queryKey] && this[queryKey][index]) {
          this[queryKey][index].checked = true;
        }
      });
    }
  }

  pushQuery(queryKey) {
    const {
      router,
      location
    } = this.props;

    let checkedIndexArr = [];
    this[queryKey].forEach((elem, index) => {
      if (elem.checked) {
        checkedIndexArr.push(index);
      }
    });

    router.push({
      ...location,
      query: {
        ...location.query,
        [queryKey]: checkedIndexArr
      }
    });
  }

  checkFilter(index) {
    this.filters[index].checked = !this.filters[index].checked;

    this.pushQuery('filters');
  }

  checkSort(index) {
    this.sorts = this.sorts.map((elem) => {
      elem.checked = false;
      return elem;
    });

    this.sorts[index].checked = true;

    this.pushQuery('sorts');
  }

  render() {
    const ticketsFilters = this.filters.map((elem, index) => {
      return (
        <Checkbox key={'filter' + index} title={elem.title} onClick={this.checkFilter.bind(this, index)} defaultChecked={elem.checked} />
      );
    });

    const ticketsSort = this.sorts.map((elem, index) => {
      return (
        <Radio key={'sort' + index} name="sort" title={elem.title} onClick={this.checkSort.bind(this, index)} defaultChecked={elem.checked} />
      );
    });

    return (
      <div className="sidebar">
        <strong>Filter:</strong><br />
        <form>
          {ticketsFilters}
        </form>
        <strong>Sort:</strong><br />
        <form>
          {ticketsSort}
        </form>
      </div>
    );
  }
};

export default Sidebar;
