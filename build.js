const fs = require('fs');
const plugins = require('./plugins.json');
const browsers = require('./browsers.json');

function build(browsers, plugins){
  return `${head()}
    <table class="highlight">
      <thead>
        <tr>
          <th></th>
          ${browsers.map(browser => browserCell(browser)).join('')}
        </tr>
      </thead>
      <tbody>
        ${entries(plugins).map(plugin => pluginRow(browsers, plugin)).join('')}
      </tbody>
    </table>
  ${tail()}`;
}

function head(){
  return `<!DOCTYPE html>
    <html>
      <head>
        <!--Import Google Icon Font-->
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css"  media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href="/css/style.css" />

        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Do I need Babel today?</title>
      </head>
    <body>`;
}

function tail(){
  return `
      </body>
    </html>`;
}

function browserCell(browser){
  return `<th data-field="${browser.id}">${browser.name} (${browser.version})</th>`;
}

function pluginRow(browsers, plugin){
  return `
    <tr class="plugin-row">
      <td class="plugin-name">${plugin.key}</td>
      ${browsers.map(browser => pluginCell(browser, plugin.values)).join('')}
    </tr>`;
}

function pluginCell(browser, plugin){
  const pluginVersion = plugin[browser.id] || 'Not supported';
  const isSupported = pluginVersion <= browser.version;
  return `<td class="${isSupported ? 'is-supported' : ''}">${pluginVersion}</td>`;
}

function entries(object){
  return Object.keys(object).map(key => ({
    key,
    values: object[key]
  }));
}

console.log(build(browsers, plugins));