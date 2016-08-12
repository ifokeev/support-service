import React, {
  Component
} from 'react';

import {
  provideHooks
} from 'redial';

import DevTools from 'mobx-react-devtools';

import ProgressBar from './templates/ProgressBar';

import ENV from '../../env';

@provideHooks({
  startLoading: ({store}) => store('runtime').set('loading', true),
  stopLoading: ({store}) => store('runtime').set('loading', false)
})
class App extends Component {
  render() {
    const devTools = ENV === 'development' ? <DevTools /> : null;

    return (
      <div>
        <ProgressBar />
        <div className="container">
          {this.props.children}
        </div>
        {devTools}
      </div>
    );
  }
};

export default App;
