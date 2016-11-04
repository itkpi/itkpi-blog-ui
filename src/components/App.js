// imports from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// imports from styles
import appStyles from '~styles/app.scss';
import fbg from '~styles/fbg.js';

class App extends React.Component {

  static childContextTypes = {
    insertCss: toBe.func.isRequired,
  };

  static contextTypes = {
    insertCss: toBe.func,
  };

  render() {
    // Pass rendering responsibility down to its children
    return React.Children.only(this.props.children);
  }

}

export default withStyles(appStyles, fbg)(App);
