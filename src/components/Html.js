import React, { PropTypes as toBe } from 'react';
import serialize from 'serialize-javascript';
import { analytics } from '../config';

export default class Html extends React.Component {

  static propTypes = {
    style: toBe.string,
    script: toBe.string,
    chunk: toBe.string,
    state: toBe.object,
    children: toBe.string,
    head: toBe.array,
  };

  static defaultProps = {
    head: '',
  };

  renderReduxState() {
    const { state } = this.props;

    if (!state) { return null; }

    const innerHTML = { __html: `window.APP_STATE=${serialize(state, { isJSON: true })}` };
    return <script dangerouslySetInnerHTML={innerHTML} />;
  }

  render() {
    const { style, script, chunk, children, head } = this.props;

    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          { style ? <style id="css" dangerouslySetInnerHTML={{ __html: style }} /> : null }
          { head && head }
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          { this.renderReduxState() }
          { script && <script src={script} /> }
          { chunk && <script src={chunk} /> }

          { analytics && analytics.google && analytics.google.trackingId && ([
            <script
              key="ga-lib"
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />,
            <script
              key="ga-script"
              dangerouslySetInnerHTML={{ __html:
                'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')`,
              }}
            />,
          ]) }
        </body>
      </html>
    );
  }

}
