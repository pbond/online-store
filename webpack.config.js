/* eslint-disable */
const path = require('path');
// const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    filename: 'index.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: 'index.html',
    }),
    new EslingPlugin({ extensions: "ts" }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/assets/img'), 
          to: path.resolve(__dirname, './dist/assets/img') },
        { from: path.resolve(__dirname, './src/assets/icons'), 
          to: path.resolve(__dirname, './dist/assets/icons') },
      ],
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'index.css',
    // })
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|woff|ttf|woff2)?$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
        //fonts instruction https://youtu.be/o8KMucDpSno?t=3271
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/icons/[name][ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/img/[name][ext]'
        }
        // images instruction https://youtu.be/o8KMucDpSno?t=3375
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production"; 
    config.plugins.push(new MiniCssExtractPlugin());
    //config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
    config.devtool = 'inline-source-map';
  }
  return config;
};

// module.exports = ({ mode }) => {
//   const isProductionMode = mode === "prod";
//   const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config");
//
//   return merge(baseConfig, envConfig);
// };
