const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.join(__dirname, './resources/js'),
      '~': path.join(__dirname, './resources')
    }
  },
  output: {
    chunkFilename: 'js/[chunkhash].js'
  }
};
