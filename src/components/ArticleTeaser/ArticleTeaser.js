// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

// import from styles
import styles from './article-teaser.scss';

// import from component
import { Image, DateTime } from '~components';

class ArticleTeaser extends React.Component {

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
      <div className={styles.articleInfo} >
        { image && <Image isCircle src={image} /> }
        <div className={styles.container} >
          <div className={styles.author}>
            { `${firstName} ${lastName}` }
          </div>
          <DateTime timestamp={postedAt} />
        </div>
      </div>
    );
  }

  render() {
    const { image, description, isLead } = this.props;

    const containerClasses = isLead
      ? styles.articleTeaser
      : classNames(styles.articleTeaser, styles.small);

    return (
      <article className={containerClasses}>
        <Image src={image} withTitle={isLead} />
        { this.renderArticleInfo() }
        <div className={styles.description}>
          { description }
        </div>
      </article>
    );
  }
}

export default withStyles(styles)(ArticleTeaser);
