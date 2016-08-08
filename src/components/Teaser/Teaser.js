import React, { PropTypes as toBe } from 'react';
import classNames from 'classnames';

import {
  ArticleInfo,
  DescriptionImage
} from 'components';

import classes from './teaser.scss';
import fixtures from './teaser.fixtures';

export default class Teaser extends React.Component {
  static propTypes = {
    isBig: toBe.bool,
    image: toBe.string,
    author: toBe.objectOf(toBe.string),
    createTime: toBe.string,
    description: toBe.string,
    title: toBe.string
  }

  static defaultProps = {
    ...fixtures
  }

  renderBig() {
    return (
      <article className={classes.teaser}>
        <DescriptionImage
          image={this.props.image}
          title={this.props.title}
        />
        <ArticleInfo
          authorImage={this.props.author.image}
          authorName={this.props.author.name}
          createTime={this.props.createTime}
        />
        <div className={classes.description} >
          {this.props.description }
        </div>
      </article>
    );
  }

  renderSmall() {
    const containerClasses = classNames(classes.teaser, classes.small);
    return (
      <article className={containerClasses} >
        <DescriptionImage
          image={this.props.image}
        />
        <ArticleInfo
          authorImage={this.props.author.image}
          authorName={this.props.author.name}
          createTime={this.props.createTime}
        />
        <div className={classes.description} >
          {this.props.description }
        </div>
      </article>
    );
  }

  render() {
    return this.props.isBig ? this.renderBig() : this.renderSmall();
  }
}
