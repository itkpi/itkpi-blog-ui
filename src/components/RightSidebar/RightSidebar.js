import React, { PropTypes as toBe } from 'react';

export default class RightSidebar extends React.Component {

  static propTypes = {
    components: toBe.arrayOf(toBe.func)
  };

  static defaultProps = {
    components: []
  };

  render() {
    const { components } = this.props;

    return (
      <div>
        <p>right sidebar</p>
        { components.map((Component, index) => <Component key={index} />) }
      </div>
    );
  }

}
