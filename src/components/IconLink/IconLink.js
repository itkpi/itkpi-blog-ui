import React, { PropTypes as toBe } from 'react';

import styles from './icon-link.scss';

export default class IconLink extends React.Component {

  static propTypes = {
    href: toBe.string,
    src: toBe.string
  };

  render() {
    const { href, src } = this.props;
    return (
      <a className={styles.iconLink} href={href}>
        <img className={styles.icon} src={src} />
      </a>
    );
  }
}
