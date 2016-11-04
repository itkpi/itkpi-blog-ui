// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import from styles
import classes from './ad.scss';

class Ad extends React.Component {
  static propTypes = {
    imageSrc: toBe.string,
    text: toBe.string
  };

  static defaultProps = {
    imageSrc: null,
    text: 'Тут может быть ваша реклама'
  };

  renderAd() {
    const { imageSrc, text } = this.props;
    return imageSrc
      ? <img src={imageSrc} />
      : <div className={classes.text}>{ text }</div>;
  }

  render() {
    return (
      <section className={classes.ad}>
        { this.renderAd() }
      </section>
    );
  }
}

export default withStyles(classes)(Ad);
