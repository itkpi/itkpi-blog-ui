import React, { PropTypes as toBe } from 'react';
import {
  CircleImage,
  Time
} from 'components';

import classes from './article-info.scss';
export default class Articles extends React.Component {
  static propTypes = {
    authorImage: toBe.string,
    authorName: toBe.string,
    createTime: toBe.string
  }

  static defaultProps = {
    authorImage: '',
    authorName: '',
    createTime: ''
  }

  render() {
    return (
      <div className={classes.articleInfo} >
        <CircleImage src={this.props.authorImage} />
        <div className={classes.container} >
          <div className={classes.authorName}>{ this.props.authorName }</div>
          <Time time={this.props.createTime} />
        </div>
      </div>
    );
  }
}
