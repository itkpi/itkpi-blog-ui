import React, { PropTypes as toBe } from 'react';

import fixtures from './footer.fixtures.js';
import classes from './footer.scss';
import { IconLink } from '../';

export default class Footer extends React.Component {

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
      <footer className={classes.footer} >
        <hr className={classes.line} />
        <div className={classes.icons}>
          { this.renderIcons() }
        </div>
        <div className={classes.copyright}>
          Copyright © 2016. IT KPI. All Rights Reserved.
        </div>
      </footer>
    );
  }
}
