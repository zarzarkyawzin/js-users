const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackObfuscator = require('webpack-obfuscator');

var config = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                title: "Webpack Demo",
                template: 'index.html'
            }
        ),
        new MiniCssExtractPlugin(),
        new CssMinimizerPlugin(
            {
                minify: CssMinimizerPlugin.cleanCssMinify,
            }
        ),
        new HtmlMinimizerPlugin(),
        new CopyPlugin({
            patterns: [
            { from: "./src/view", to: "view" },
            { from: "./src/image", to: "image" }
            ],
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4200,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: [/node_modules/, require.resolve('./index.html')],
                loader: 'file-loader',
                options: {
                    outputPath: 'html',
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {  loader: 'css-loader' }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'image',
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                outputPath: 'font',
                name: '[name].[ext]'
                },
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'dependencies',
                    chunks: 'all'
                }
            }
        }
    },
    performance : {
        hints : false
    } 
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.plugins.push(
            new WebpackObfuscator ({
                rotateStringArray: true,
                reservedStrings: [ '\s*' ]
            })
        )
    }

    return config;
};