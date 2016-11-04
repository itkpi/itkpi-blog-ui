// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import from styles
import classes from './image.scss';

class Image extends React.Component {

  static propTypes = {
    src: toBe.string.isRequired,
    isCircle: toBe.bool,
    withTitle: toBe.bool,
    title: toBe.string
  };

  static defaultProps = {
    src: '',
    isCircle: false,
    withTitle: false,
    title: ''
  };

  renderCircleImage() {
    const { src } = this.props;

    return (
      <div
        className={classes.circleImage}
        style={{ backgroundImage: `url(${src})` }}
      />
    );
  }

  renderImageWithTitle() {
    const { src, title } = this.props;

    return (
      <div
        className={classes.descriptionImage}
        style={{ backgroundImage: `url(${src})` }}
      >
        { title && <h2 className={classes.title}>{ title }</h2> }
      </div>
    );
  }

  render() {
    const { isCircle, withTitle, src } = this.props;

    if (isCircle) { return this.renderCircleImage(); }
    if (withTitle) { return this.renderImageWithTitle(); }

    return <img className={classes.image} src={src} />;
  }
}

export default withStyles(classes)(Image);
