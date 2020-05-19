const {GuessPlugin} = require('guess-webpack');
const {parseRoutes} = require('guess-parser');
const credentials = require('./prefetching-credentials.json');

module.exports = {
  plugins: [
    new GuessPlugin({
      // Alternatively you can provide a Google Analytics View ID
      // GA: 'XXXXXX',
      GA: '203199961',
      jwt: credentials,
      runtime: {
        delegate: false
      },
      routeProvider() {
        return parseRoutes('.');
      }
    })
  ]
};
