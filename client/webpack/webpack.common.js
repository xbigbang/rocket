const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelrc = JSON.parse(fs.readFileSync(process.cwd() + '/.babelrc', 'utf8'));

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/pages/editor/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].[contenthash].js',
    publicPath: `//${pkg.hostname}:${ pkg.clientPort}/`,
    libraryTarget: 'umd',
    chunkFilename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
        {
            loader: 'babel-loader',
            options: Object.assign({}, babelrc, { cacheDirectory: true })
        }, {
            loader: 'ts-loader'
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|swf|svg|woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'asset/imgs/[name].[hash].[ext]',
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                relativeUrls: true,
                modifyVars: {
                  // 主题色：ant-design
                  'primary-color': '#4A82F7',
                  // 主题色：自定义部分
                  'blue--beatles': '#4A82F7',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.less', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/layout/index.html'),
    })
  ]
};