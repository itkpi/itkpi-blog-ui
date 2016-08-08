import React, { PropTypes as toBe } from 'react';

import classes from './time.scss';

export default class Time extends React.Component {
  static propTypes = {
    time: toBe.string
  };

  static defaultProps = {
    time: ''
  };

  render() {
    return (
      <div className={classes.time} >
        { this.props.time }
      </div>
    );
  }
}
