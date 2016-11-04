// import from vendors
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Helmet from 'react-helmet';

// import from components
// import from styles
import classes from './tag.scss';

// import from constants

class Tag extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <Helmet title="Tag" />

        List of articles filtered by a tag.
      </div>
    );
  }
}

export default withStyles(classes)(Tag);
