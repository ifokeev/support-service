import React, {
  Component
} from 'react';

import {
  observer
} from 'mobx-react';

import Comment from '../atoms/Comment';

import moment from 'moment';

class Comments extends Component {
  get items() {
    return this.props.items || [];
  }

  render() {
    return (
      <div className="ticket__comments">
        {this.items.map((comment, index) =>
          <Comment key={comment['_id']['$oid']} data={comment} isFirst={index === 0}  />
        )}
      </div>
    );
  }
};

export default Comments;
