const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.MODE_BUILD === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: "source-map",
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "js/[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    open: false,
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(s)?css$/,
        use: [
          { loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.(jp(e)?g|png|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[contenthash][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[contenthash][ext]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: [".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].css",
    }),
  ],
};
