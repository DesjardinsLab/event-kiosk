module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: 'dist/',
        publicPath: 'http://192.168.1.86:3030/dist'
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
            },
            {
              test: /\.css$/,
              loader: "style-loader!css-loader"
            },
            {
              test: /\.less$/,
              loader: "style!css!less"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
