const path = require("path");
const webpack = require("webpack");

const BUILD_DIR = path.resolve(__dirname, "./build");
const APP_DIR = path.resolve(__dirname, "./src/client");

const config = {
  entry: {
    main: `${APP_DIR}/index.js`
  },
  output: {
    filename: "bundle.js",
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["react", "es2015"] // Transpiles JSX and ES6
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
};

module.exports = config;
