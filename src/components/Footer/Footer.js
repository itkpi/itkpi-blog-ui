import React from 'react';
import fixtures from './footer.fixtures.js';

export default class Footer extends React.Component {

  static defaultProps = {
    ...fixtures
  }

  renderIcons() {
  	// return this.props.icons.map(icon => {
  	// 	<a href={icon.link}>
  	// 		<img src={icon.src}/>
  	// 	</a>
  	// });
  }

  render() {
    // const icons = this.renderIcons();
    return (
      <footer>
        <div>
        { /* icons */ }
        </div>
      </footer>
    );
  }
}
