// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import from styles
import styles from './search.scss';

class Search extends React.Component {
  static propTypes = {
    placeholder: toBe.string
  };

  static defaultProps = {
    placeholder: 'Поиск...'
  };

  searchByKey = (event) => {
    console.log(event.target.value);
  };

  render() {
    return (
      <section className={styles.search}>
        <input
          type="search"
          placeholder={this.props.placeholder}
          className={styles.input}
          onChange={this.searchByKey}
        />
      </section>
    );
  }

}

export default withStyles(styles)(Search);
