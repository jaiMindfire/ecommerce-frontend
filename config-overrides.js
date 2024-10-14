// config-overrides.js
const path = require('path');

module.exports = function override(config) {
  // Add custom Webpack aliases for absolute imports
  config.resolve.alias = {
    ...config.resolve.alias, // Keep existing aliases
    '@components': path.resolve(__dirname, 'src/components'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@middleware': path.resolve(__dirname, 'src/middleware'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@models': path.resolve(__dirname, 'src/models'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@redux': path.resolve(__dirname, 'src/redux'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@theme': path.resolve(__dirname, 'src/theme')
  };

  return config;
};
