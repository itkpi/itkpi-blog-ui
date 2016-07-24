import React, { PropTypes as toBe } from 'react';
import Helmet from 'react-helmet';
import config from '../config';

import '../styles/global.scss';

export default class AppLayout extends React.Component {

  static propTypes = {
    children: toBe.object.isRequired
  };

  render() {
    return (
      <div>
        <Helmet {...config.app.head} />

        <div>
          { this.props.children }
        </div>

      </div>
    );
  }

}
