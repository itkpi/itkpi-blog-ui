import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../../components';

export default class Home extends React.Component {
  render() {
    console.log(Footer);
    return (
      <div>
        <Helmet title="Home" />
      </div>
    );
  }
}
