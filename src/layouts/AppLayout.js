import React, { PropTypes as toBe } from 'react';
import Helmet from 'react-helmet';
import config from '../config';

import '../styles/global.scss';

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

    return (
      <div className="right-sidebar-container">
        { right }
      </div>
    );
  }

  renderCenter() {
    const { center, children } = this.props;

    return (
      <div className="center-container">
        { center ? center : children }
      </div>
    );
  }

  render() {
    return (
      <div className="page-container">
        <Helmet {...config.app.head} />

        { /* Left sidebar will be here */ }
        { this.renderCenter() }
        { this.renderRightSidebar() }

      </div>
    );
  }

}
