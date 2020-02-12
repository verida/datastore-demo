const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

const directory = {
  app: `${__dirname}/projects/${process.env.APP_PATH}`,
  public: `${__dirname}/public/${process.env.APP_PATH}`
}

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  outputDir: directory.public,
  configureWebpack: {
    entry: { app: `${directory.app}/main.js` },
    resolve: {
      symlinks: false,
      alias: {
        '@': directory.app,
        '@schemas': path.resolve(__dirname, 'public/schemas'),
        '@src': path.resolve(__dirname, 'src'),
        'assets': `${directory.app}/assets`
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: file => (
            /node_modules/.test(file) && !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto'
        }
      ]
    },
    output: {
      filename: 'js/script.js',
      chunkFilename: 'js/[id].js'
    },
    plugins: [
      new HtmlPlugin({
        title: process.env.TITLE,
        template: `src/assets/index.html`,
        favicon: `${directory.app}/assets/favicon.png`,
        hash: true
      })
    ]
  }
}
