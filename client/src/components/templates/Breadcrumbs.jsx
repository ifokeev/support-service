import React, {
  Component
} from 'react';

import {
  withRouter
} from 'react-router';

import ReactRouterBreadcrumbs from 'react-breadcrumbs';

@withRouter
class Breadcrumbs extends Component {
  render() {
    return (
      <div>
        <ReactRouterBreadcrumbs
          routes={this.props.routes}
          params={this.props.params}
          excludes={['App']}
        />
      </div>
    );
  }
};

export default Breadcrumbs;
