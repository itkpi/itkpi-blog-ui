import React, { PropTypes as toBe } from 'react';

import classes from './description-image.scss';

export default class DescriptionImage extends React.Component {
  static propTypes = {
    image: toBe.string,
    title: toBe.string,
  };
  getTitle() {
    return (
      <h2 className={classes.title} dangerouslySetInnerHTML={{__html: this.props.title }} />
    );
  }
  render() {
    const title = this.props.title ? this.getTitle() : '';
    return (
      <div
        className={classes.descriptionImage}
        style={{
          backgroundImage: 'url(' + this.props.image + ')'
        }}
      >
        { title }
      </div>
    );
  }
}
