const {GuessPlugin} = require('guess-webpack');
const {parseRoutes} = require('guess-parser');

module.exports = {
  plugins: [
    new GuessPlugin({
      // Alternatively you can provide a Google Analytics View ID
      // GA: 'XXXXXX',
      reportProvider() {
        return Promise.resolve({
          GA: 'UA-142190160-2'
        });
      },
      runtime: {
        delegate: false
      },
      routeProvider() {
        return parseRoutes('.');
      }
    })
  ]
};
