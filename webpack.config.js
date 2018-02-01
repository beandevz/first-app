const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    // SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src'),
    PUBL: path.resolve(__dirname, 'public'),
};

// Webpack configuration
module.exports = {
    entry: path.join(paths.JS, 'index.js'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },
    plugins: [
        // Tell webpack to use html plugin
        new HtmlWebpackPlugin({
            template: path.join(paths.PUBL, 'index.html'),
        }),
        // CSS will be extracted to this bundle file
        new ExtractTextPlugin('style.bundle.css'),
    ],
    // Loaders configuration
    // We are telling webpack to use "babel-loader" for .js and .jsx files
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            // CSS loader to CSS files
            // Files will get handled by css loader and then passed to the extract text plugin
            // which will write it to the file we defined above
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            },
            // File loader for image assets
            // We'll add only image extensions, but you can things like svgs, fonts and videos
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    // Enable importing JS files without specifying their's extenstion
    //
    // So we can write:
    // import MyComponent from './my-component';
    //
    // Instead of:
    // import MyComponent from './my-component.jsx';
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    // Now it uses our "src" folder as a starting point
    // devServer: {
    //     contentBase: paths.SRC,
    // },
};