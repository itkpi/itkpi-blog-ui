import React from 'react';

import classes from './left-sidebar.scss';

const leftSidebarWidths = {
  opened: 310,
  closed: 85
};

export default class LeftSidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = { opened: false };
  }

  expandSidebar = (open) => this.setState({ opened: open });

  openSidebar = () => this.expandSidebar(true);

  closeSidebar = () => this.expandSidebar(false);

  containerWidth() {
    const { opened } = this.state;
    return opened ? leftSidebarWidths.opened : leftSidebarWidths.closed;
  }

  render() {
    return (
      <div
        className={classes.leftSidebar}
        style={{ width: this.containerWidth() }}
        onMouseEnter={this.openSidebar}
        onMouseLeave={this.closeSidebar}
      >
        left sidebar
      </div>
    );
  }

}
