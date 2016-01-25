var autoprefixer = require('autoprefixer')

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: 'dist/',
        publicPath: '/dist/'
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
              loader: "style-loader!css-loader!postcss-loader"
            },
            {
              test: /\.less$/,
              loader: "style-loader!css-loader!postcss-loader!less-loader"
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
