const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/template.html'),
        }),
    ],
};