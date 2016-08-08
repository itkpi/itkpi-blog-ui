import React from 'react';
import Helmet from 'react-helmet';
import { Articles } from 'components';
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />
        <Articles/>
      </div>
    );
  }
}
