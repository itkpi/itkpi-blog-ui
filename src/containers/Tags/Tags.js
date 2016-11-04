// import from vendors
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Helmet from 'react-helmet';

// import from components
// import from styles
import styles from './tags.scss';

// import from constants

class Tags extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <Helmet title="Tags" />

        List of tags
      </div>
    );
  }
}

export default withStyles(styles)(Tags);
