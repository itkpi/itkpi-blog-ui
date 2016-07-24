import React, { propType as toBe } from 'react';

export default class SocialIcon extends React.Component {

  static propTypes = {
    href: toBe.string,
    src: toBe.string
  };

  render() {
    const href = this.props.href;
    const src = this.props.src;
    return (
      <a href={href}>
        <img src={src}/>
      </a>
    );
  }
}
