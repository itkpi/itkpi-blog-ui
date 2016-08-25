import React, { PropTypes as toBe } from 'react';

import classes from './date-time.scss';

export default class DateTime extends React.Component {

  static propTypes = {
    timestamp: toBe.number
  };

  static defaultProps = {
    timestamp: 1472159478703
  };

  render() {
    // TODO: use moment.js
    return (
      <div className={classes.dateTime} >
        { this.props.timestamp }
      </div>
    );
  }
}
