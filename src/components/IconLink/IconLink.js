// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import from styles
import styles from './icon-link.scss';

class IconLink extends React.Component {

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

export default withStyles(styles)(IconLink);
