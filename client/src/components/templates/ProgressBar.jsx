import React, {
  Component
} from 'react';

import {
  observer,
  inject
} from 'mobx-react';

import Progress from "react-progress-2";

@inject('store') @observer
class ProgressBar extends Component {
  componentWillReact() {
    if (this.loading) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  get loading() {
    return this.props.store('runtime').get('loading');
  }

  render() {
    return (
      <div className={(this.loading ? 'loading' : '')}>
        <Progress.Component/>
      </div>
    );
  }
};

export default ProgressBar;
