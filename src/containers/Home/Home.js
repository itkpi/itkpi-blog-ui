// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Helmet from 'react-helmet';

// import from components
import {
  ArticleTeaser,
  Label,
  ThemeLabel
} from '~components';

// import from styles
import styles from './home.scss';

// import from constants
import { ARTICLES_AMOUNT } from '~constants/home';

import articlesFixtures from './articles.fixtures';

class Home extends React.Component {

  static propTypes = {
    label: toBe.string,
    themeLabel: toBe.string,
    articles: toBe.arrayOf(toBe.shape({
      image: toBe.string,
      postedAt: toBe.number,
      title: toBe.string,
      description: toBe.string,
      author: toBe.shape({
        firstName: toBe.string,
        lastName: toBe.string,
        image: toBe.string
      })
    }))
  };

  static defaultProps = {
    label: 'статті',
    themeLabel: 'Software',
    articles: articlesFixtures
  };

  renderArticleList() {
    const { articles } = this.props;

    if (!articles) {
      return (
        <div className={styles.list}>
        </div>
      );
    }

    const [first, ...tail] = articles.slice(0, ARTICLES_AMOUNT - 1);

    // Each key must be unique. TODO: use id of an article in the near future.
    return (
      <div className={styles.list}>
        { first && <ArticleTeaser key={0} isLead { ...first } /> }
        { tail && tail.map((article, idx) => <ArticleTeaser key={idx + 1} { ...article } />) }
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />

        <div className={styles.articles}>
          <Label text={this.props.label} />
          <ThemeLabel text={this.props.themeLabel} />

          { this.renderArticleList() }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
