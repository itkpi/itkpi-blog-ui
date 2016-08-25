import React, { PropTypes as toBe } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Root extends React.Component {

  static propTypes = {
    assets: toBe.object,
    component: toBe.node,
    store: toBe.object
  };

  renderStyles() {
    const { assets } = this.props;

    // styles (will be present only in production with webpack extract text plugin)
    return Object.keys(assets.styles).map((style, key) => (
      <link
        href={assets.styles[style]}
        key={key}
        media="screen, projection"
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
      />
    ));
  }

  renderHead() {
    const head = Helmet.rewind();
    const headPropsToExtract = ['base', 'title', 'meta', 'link', 'script'];
    const headItems = headPropsToExtract.map(property => head[property].toComponent());

    return (
      <head>
        { headItems }
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        { this.renderStyles() }
      </head>
    );
  }

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html lang="en-us">
        { this.renderHead() }
        <body>
          <div id="app-root" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
          <script src={assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
