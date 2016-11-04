// import from vendors
import React, { PropTypes as toBe } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import from styles
import styles from './footer.scss';

// import from components
import { IconLink } from '~components';

import fixtures from './footer.fixtures.js';

class Footer extends React.Component {

  static propTypes = {
    icons: toBe.array
  };

  static defaultProps = {
    ...fixtures
  };

  renderIcons() {
    const { icons } = this.props;
    return icons.map((icon, index) =>
      <IconLink
        href={icon.link}
        src={icon.src}
        key={index}
      />
  	);
  }

  render() {
    return (
      <footer className={styles.footer} >
        <hr className={styles.line} />
        <div className={styles.icons}>
          { this.renderIcons() }
        </div>
        <div className={styles.copyright}>
          Copyright © 2016. IT KPI. All Rights Reserved.
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
