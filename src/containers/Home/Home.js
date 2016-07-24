import React from 'react';
import Helmet from 'react-helmet';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <div>Home content</div>
      </div>
    );
  }
}
