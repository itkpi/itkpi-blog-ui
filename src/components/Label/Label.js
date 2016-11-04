// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import from styles
import styles from './label.scss';

class Label extends React.Component {
  static propTypes = {
    text: toBe.string
  };

  static defaultProps = {
    text: ''
  };

  render() {
    return (
      <div className={styles.label} >
        { this.props.text }
      </div>
    );
  }
}

export default withStyles(styles)(Label);
