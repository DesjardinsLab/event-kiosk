module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'dist/bundle.js',
        publicPath: 'http://localhost:3030/assets'
    },
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets: ['es2015', 'react']
              }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
