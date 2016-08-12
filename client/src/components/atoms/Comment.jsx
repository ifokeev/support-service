import React, {
  Component,
  PropTypes
} from 'react';

import moment from 'moment';

class Comment extends Component {
  get comment() {
    return this.props.data;
  }

  render() {
    const {
      isFirst
    } = this.props;

    return (
      <div className={'comment' + (isFirst ? ' first' : '')}>
        <div className="row">
          <div className="col-md-2 col-sm-4 col-xs-12 text-center">
            <div className="comment__author">
              <div>
                {this.comment.author_id}
              </div>
              <div className="comment__date">
                <span title={this.comment.updated_at}>{moment(this.comment.updated_at).fromNow()}</span>
              </div>
            </div>
          </div>
          <div className="comment__body col-md-9 col-sm-8 col-xs-12 center-xs start-sm">
            <p style={{whiteSpace: 'pre'}}>
              {this.comment.content}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Comment;
