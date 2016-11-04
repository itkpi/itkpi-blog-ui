// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

// imports from styles
import styles from './app-layout.scss';
import fbg from '~styles/fbg.js';

// imports from components
import { LeftSidebar, Footer } from '~components';

class AppLayout extends React.Component {

  static propTypes = {
    center: toBe.object,
    right: toBe.object,
    children: toBe.object
  };

  static defaultProps = {
    center: null,
    right: null,
    children: null
  };

  static childContextTypes = {
    insertCss: toBe.func.isRequired,
  };

  static contextTypes = {
    insertCss: toBe.func,
  };

  renderRightSidebar() {
    const { right } = this.props;

    if (!right) { return null; }

    return (
      <div className={classNames(styles.right, fbg.colLg3)}>
        { right }
      </div>
    );
  }

  renderCenter() {
    const { center, right, children } = this.props;

    const centerClassNames = classNames(
      styles.center,
      { [fbg.colLg12]: !right },
      { [fbg.colLg9]: !!right },
    );

    return (
      <div className={centerClassNames}>
        { center ? center : children }
      </div>
    );
  }

  render() {
    return (
      <div className={styles.appLayout}>

        <LeftSidebar />

        <div className={styles.page}>
          <main className={styles.main}>
            <div className={fbg.row}>
              { this.renderCenter() }
              { this.renderRightSidebar() }
            </div>
          </main>
        </div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(AppLayout);
