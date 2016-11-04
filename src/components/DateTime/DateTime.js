// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';

// import from styles
import classes from './date-time.scss';

// import from constants
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT
} from '~constants/common';

class DateTime extends React.Component {

  static propTypes = {
    timestamp: toBe.number
  };

  static defaultProps = {
    timestamp: 1472159478703
  };

  constructor(...args) {
    super(...args);

    moment.locale('uk');
  }

  isYesterday(timestamp) {
    const yesterday = moment(Date.now()).subtract(1, 'days').startOf('day');
    return moment(timestamp).isSame(yesterday, 'd');
  }

  isToday(timestamp) {
    const today = moment(Date.now()).startOf('day');
    return moment(timestamp).isSame(today, 'd');
  }

  render() {
    const { timestamp } = this.props;

    const momentInstance = moment(timestamp);
    const date = this.isToday(timestamp) || this.isYesterday(timestamp)
      ? momentInstance.calendar()
      : momentInstance.format(DEFAULT_DATE_FORMAT);
    const dateTime = momentInstance.format(DEFAULT_DATE_TIME_FORMAT);

    return (
      <time dateTime={dateTime} className={classes.dateTime} >
        { date }
      </time>
    );
  }
}

export default withStyles(classes)(DateTime);
