// import from vendors
import React, { PropTypes as toBe } from 'react';
import moment from 'moment';

// import from styles
import classes from './date-time.scss';

// import from constants
import { DEFAULT_DATE_TIME_FORMAT } from 'constants/common';

export default class DateTime extends React.Component {

  static propTypes = {
    timestamp: toBe.number,
    format: toBe.string
  };

  static defaultProps = {
    timestamp: 1472159478703,
    format: DEFAULT_DATE_TIME_FORMAT
  };

  render() {
    const { timestamp, format } = this.props;
    const datetime = moment(timestamp).format(format);
    return (
      <time dateTime={datetime} className={classes.dateTime} >
        { datetime }
      </time>
    );
  }
}
