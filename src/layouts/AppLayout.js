import React, { PropTypes as toBe } from 'react';
import Helmet from 'react-helmet';
import config from '../config';
import classNames from 'classnames';

import {
  LeftSidebar,
  Footer
} from '../components';

import classes from './app-layout.scss';
import { fbgClasses } from '../constants/css-classes';

export default class AppLayout extends React.Component {

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

  renderRightSidebar() {
    const { right } = this.props;

    if (!right) { return null; }

    const rightClassNames = classNames(classes.right, fbgClasses.colLg3);

    return (
      <div className={rightClassNames}>
        { right }
      </div>
    );
  }

  renderCenter() {
    const { center, right, children } = this.props;

    const centerClassNames = classNames(
      classes.center,
      { [fbgClasses.colLg12]: !right },
      { [fbgClasses.colLg9]: !!right },
    );

    return (
      <div className={centerClassNames}>
        { center ? center : children }
      </div>
    );
  }

  render() {
    return (
      <div className={classes.appLayout}>
        <Helmet { ...config.app.head } />

        <LeftSidebar />

        <div className={classes.page}>
          <main className={classes.main}>
            <div className={fbgClasses.row}>
              { this.renderCenter() }
              { this.renderRightSidebar() }
            </div>
          </main>
        </div>

        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }

}
