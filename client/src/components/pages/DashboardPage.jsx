import React, {
  Component
} from 'react';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

export default DashboardPage;
