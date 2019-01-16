const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
  entry: [
    './src/assets/script/index.ts',
    'babel-polyfill',
    'classlist-polyfill'
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'script/app.bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ejs$/,
        use: [
          'html-loader',
          'ejs-html-loader'
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/templates/index.ejs'
    }),
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ]
};
