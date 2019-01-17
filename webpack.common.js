const path = require('path');
const globule = require('globule');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const app = {
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
      }
    ],
  },
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ]
};

/**
 * ejsのpathを返す
 */
const getEntriesList = () => {
  const entriesList = {};
  const filesMatched = globule.find([`**/*.ejs`, `!**/_*.ejs`], {cwd: `${__dirname}/src/`});

  for (const srcName of filesMatched) {
    const targetName = srcName.replace(new RegExp(`.ejs$`, 'i'), `.html`);
    entriesList[targetName] = `${__dirname}/src/${srcName}`;
  }

 return entriesList;
};

for (const [targetName, srcName] of Object.entries(getEntriesList())) {
  app.plugins.push(new HtmlWebpackPlugin({
    filename: targetName,
    template: srcName
  }));
}

module.exports = app;
