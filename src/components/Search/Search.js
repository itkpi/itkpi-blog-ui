import React from 'react';

import classes from './search.scss';

export default class Seach extends React.Component {

  searchByKey(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <section className={classes.search}>
        <input
          type="serch"
          className={classes.input}
          onChange={::this.searchByKey}
        />
      <div>{ this.state.mathes }</div>
      </section>
    );
  }

}
