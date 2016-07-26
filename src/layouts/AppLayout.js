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

    const rightContainerClassNames = classNames(classes.rightContainer, fbgClasses.colLg3);

    return (
      <div className={rightContainerClassNames}>
        { right }
      </div>
    );
  }

  renderCenter() {
    const { center, right, children } = this.props;

    const centerContainerClassNames = classNames(
      classes.centerContainer,
      { [fbgClasses.colLg12]: !right },
      { [fbgClasses.colLg9]: !!right },
    );

    return (
      <div className={centerContainerClassNames}>
        { center ? center : children }
      </div>
    );
  }

  render() {
    const pageContainerClassName = classNames(classes.pageContainer, fbgClasses.containerFluid);

    return (
      <div className={classes.appLayout}>
        <Helmet { ...config.app.head } />
        <LeftSidebar />
        <div className={pageContainerClassName}>
          <div className={fbgClasses.row}>
            { this.renderCenter() }
            { this.renderRightSidebar() }
          </div>
          <Footer/>
        </div>
      </div>
    );
  }

}
