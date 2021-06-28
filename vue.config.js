const px2rem = require('postcss-px2rem');

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 23.4,
          }),
        ],
      },
    },
  },
};
