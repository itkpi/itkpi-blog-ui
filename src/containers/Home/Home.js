// import from vendors
import React, { PropTypes as toBe } from 'react';
import Helmet from 'react-helmet';

// import from components
import {
  ArticleTeaser,
  Label,
  ThemeLabel
} from 'components';

// import from styles
import classes from './home.scss';

// import from constants
import { ARTICLES_AMOUNT } from 'constants/home';

import articlesFixtures from './articles.fixtures';

export default class Home extends React.Component {

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
        <div className={classes.list}>
        </div>
      );
    }

    const [first, ...tail] = articles.slice(0, ARTICLES_AMOUNT - 1);

    // Each key must be unique. TODO: use id of an article in the near future.
    return (
      <div className={classes.list}>
        { first && <ArticleTeaser key={0} isLead { ...first } /> }
        { tail && tail.map((article, idx) => <ArticleTeaser key={idx + 1} { ...article } />) }
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />

        <div className={classes.articles}>
          <Label text={this.props.label} />
          <ThemeLabel text={this.props.themeLabel} />

          { this.renderArticleList() }
        </div>
      </div>
    );
  }
}
