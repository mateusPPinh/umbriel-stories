const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'string-width': path.resolve(__dirname, 'node_modules/string-width/index.js')
    }
  }
};
