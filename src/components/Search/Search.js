import React, { PropTypes as toBe } from 'react';

import classes from './search.scss';

export default class Seach extends React.Component {
  static propTypes = {
    placeholder: toBe.string
  };

  static defaultProps = {
    placeholder: 'Поиск...'
  };

  searchByKey = (event) => {
    console.log(event.target.value);
  }

  render() {
    return (
      <section className={classes.search}>
        <input
          type="serch"
          placeholder={this.props.placeholder}
          className={classes.input}
          onChange={this.searchByKey}
        />
      </section>
    );
  }

}
