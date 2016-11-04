import React, { PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

/**
 * Sets up contexts that will be passed down to any component in the subtree.
 */
class ContextHolder extends React.Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
    };
  }

  render() {
    // Pass rendering responsibility down to its children
    return React.Children.only(this.props.children);
  }

}

export default ContextHolder;
