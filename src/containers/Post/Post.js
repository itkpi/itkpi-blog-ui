// import from vendors
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Helmet from 'react-helmet';

// import from components
// import from styles
import classes from './post.scss';

// import from constants

class Post extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <Helmet title="Post" />

        Single Post
      </div>
    );
  }
}

export default withStyles(classes)(Post);
