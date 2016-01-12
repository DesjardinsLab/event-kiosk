module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: 'dist/',
        publicPath: 'http://localhost:3030/dist'
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
