import React, { PropTypes as toBe } from 'react';
import {
  Teaser,
  Label,
  ThemeLabel
} from 'components';

import classes from './articles.scss';
export default class Articles extends React.Component {
  static propTypes = {
    label: toBe.string,
    themeLabel: toBe.string
  }

  static defaultProps = {
    label: 'статті',
    themeLabel: 'Software'
  }

  render() {
    return (
      <div className={classes.articles} >
        <Label text={this.props.label} />
        <ThemeLabel text={this.props.themeLabel} />
        <div className={classes.list} >
          <Teaser isBig />
          <Teaser/>
          <Teaser/>
          <Teaser/>
        </div>

      </div>
    );
  }
}
