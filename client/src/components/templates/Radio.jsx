import React, {
  Component,
  PropTypes
} from 'react';


class Radio extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.props.onClick.bind(this);
  }

  render() {
    const {
      defaultChecked,
      title,
      name
    } = this.props;

    return (
      <div className="radio">
        <label>
          <input type="radio" name={name} onClick={this.onClick} defaultChecked={defaultChecked}/> {title}
        </label>
      </div>
    );
  }
};

Radio.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
}

export default Radio;
