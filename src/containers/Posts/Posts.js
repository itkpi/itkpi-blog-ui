// import from vendors
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Helmet from 'react-helmet';

// import from components
// import from styles
import classes from './posts.scss';

// import from constants

class Posts extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <Helmet title="Posts" />

        List of posts
      </div>
    );
  }
}

export default withStyles(classes)(Posts);
