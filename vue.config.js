import RollbarSourceMapPlugin from 'rollbar-sourcemap-webpack-plugin';

module.exports = {
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            'primary-color': '#F44336',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true
        }
      }
    }
  }