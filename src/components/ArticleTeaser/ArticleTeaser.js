import React, { PropTypes as toBe } from 'react';
import classNames from 'classnames';

import { Image, DateTime } from 'components';

import classes from './article-teaser.scss';

export default class ArticleTeaser extends React.Component {

  static propTypes = {
    isLead: toBe.bool,
    image: toBe.string,
    author: toBe.shape({
      firstName: toBe.string.isRequired,
      lastName: toBe.string.isRequired,
      image: toBe.string
    }).isRequired,
    title: toBe.string.isRequired,
    postedAt: toBe.number.isRequired,
    description: toBe.string,
  };

  renderArticleInfo() {
    const {
      author: { firstName, lastName, image },
      postedAt
    } = this.props;

    return (
      <div className={classes.articleInfo} >
        { image && <Image isCircle src={image} /> }
        <div className={classes.container} >
          <div className={classes.author}>
            { `${firstName} ${lastName}` }
          </div>
          <DateTime dateTime={postedAt} />
        </div>
      </div>
    );
  }

  render() {
    const { image, description, isLead } = this.props;

    const containerClasses = isLead
      ? classes.articleTeaser
      : classNames(classes.articleTeaser, classes.small);

    return (
      <article className={containerClasses}>
        <Image src={image} withTitle={isLead} />
        { this.renderArticleInfo() }
        <div className={classes.description}>
          { description }
        </div>
      </article>
    );
  }
}
