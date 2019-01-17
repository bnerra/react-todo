const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  

}

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },

  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '/src/components/stylesheet.css',
      // chunkFilename: '[id].css'
    })
  ],

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "./node_modules"),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          // {
          //   loader: 'typings-for-css-modules-loader',
          //   options: {
          //     importLoaders: 1,
          //     modules: true,
          //     namedExport: true,
          //     camelCase: true,
          //     localIdentName: '[name]_[local][hash:base64:5]',
          //     banner: "// *** Generated File - Do not Edit ***"
          //   }
          // },
          // {
          //   loader: "css-loader",
          //   options: {
          //     sourceMap: true,
          //     modules: true,
          //   }
          // }
        ]
      }
      // {
      //   test: /\.css$/,
      //   use: [
      //     "style-loader",
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         importLoaders: 1,
      //         camelCase: true,
      //         localIdentName: '[name]__[local]___[hash:base64:5]',
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // }
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         modules: true,
      //         importLoaders: 1,
      //         camelCase: true,
      //         localIdentName: '[name]_[local]_[hash:base64:5]',
      //         minimize: {
      //           safe: true
      //         },
      //         sourceMap: true
      //       }
      //     },
      //     "css-loader"
      //   ]
      // }
    ]
  },



  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};