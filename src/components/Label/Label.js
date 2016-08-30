import React, { PropTypes as toBe } from 'react';

import classes from './label.scss';

export default class Label extends React.Component {
  static propTypes = {
    text: toBe.string
  };

  static defaultProps = {
    text: ''
  };

  render() {
    return (
      <div className={classes.label} >
        { this.props.text }
      </div>
    );
  }
}
