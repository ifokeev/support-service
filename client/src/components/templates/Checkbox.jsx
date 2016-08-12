import React, {
  Component,
  PropTypes
} from 'react';


class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.props.onClick.bind(this);
  }

  render() {
    const {
      defaultChecked,
      title
    } = this.props;

    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" onClick={this.onClick} defaultChecked={defaultChecked}/> {title}
        </label>
      </div>
    );
  }
};

Checkbox.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  defaultChecked: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
}

export default Checkbox;
