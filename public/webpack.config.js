const path = require('path');

module.exports = {
  entry: './src/index.tsx',  // Entry point for React
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.bundle.js',  // Bundle output
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,  // Handle JavaScript and TypeScript
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
