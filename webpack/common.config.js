import webpack from 'webpack';
import path from 'path';

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../public')
};

process.env.BABEL_ENV = TARGET;

const common = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'babel-polyfill',
    PATHS.app,
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss'],
    modulesDirectories: ['node_modules', PATHS.app],
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.scss?$/,
      loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
      },
    ]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, '../src')],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export default common;