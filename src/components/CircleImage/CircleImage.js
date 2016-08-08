import React, { PropTypes as toBe } from 'react';

import classes from './circle-image.scss';

export default class CircleImage extends React.Component {
  static propTypes = {
    src: toBe.string
  };

  static defaultProps = {
    src: ''
  };

  render() {
    return (
      <div
        className={classes.circleImage}
        style={{
          backgroundImage: 'url(' + this.props.src + ')'
        }}
      />
    );
  }
}
