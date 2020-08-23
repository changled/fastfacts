const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            }
         },
         {
            test: /\.html$/,
            use: [
               {
                  loader: 'html-loader'
               }
            ]
         },
         {
            test: /\.css$/, use: 'css-loader',
         }
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: './src/index.html',
         filename: './index.html'
      })
   ],
   performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
   }
};