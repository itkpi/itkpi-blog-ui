import React, { PropTypes as toBe } from 'react';

import classes from './ad.scss';

export default class Ad extends React.Component {
  static propTypes = {
    imageSrc: toBe.string,
    text: toBe.string
  };

  static defaultProps = {
    imageSrc: null,
    text: 'Тут может быть ваша реклама'
  };

  renderAd() {
    const { imageSrc, text} = this.props;
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
