const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        inject: 'body',
        template: path.join(__dirname, './src/index.html')
    })],
    devServer: {
        watchFiles: ['./src/lib/index.html'],
        port: 8080,
        proxy: {
            '*': 'http://localhost:3333'
        }
    }
};