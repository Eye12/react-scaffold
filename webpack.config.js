/**
 * @Author: wyy
 * @Date: 2019/9/17
 * @Description:
 **/
const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let isDevMode = process.env.NODE_ENV === "development";
let baseOptimization = {
    usedExports: true, // 清除死代码
    runtimeChunk: "single",
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "verdors",
                chunks: "all"
            }
        }
    }
};

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // publicPath: "",
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        library: "", // 插件输出名称
        libraryTarget: "umd" // UMD：在AMD或CommonJS require（libraryTarget:'umd'）之后可用
    },
    optimization: isDevMode ? baseOptimization : Object.assign(baseOptimization, {
        minimize: true,
        minimizer: [new TerserWebpackPlugin({}), new OptimizeCSSAssetsPlugin({})]
    }),
    devtool: isDevMode ? "inline-source-map" : "source-map",
    devServer: {
        contentBase: "./dist",
        hot: isDevMode
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/i,
                exclude: /(node_modules|bower_components)/,
                loader: "eslint-loader",
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            },
            {
                test: /\.jsx?$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(c|s[ac])ss$/i,
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDevMode,
                        reloadAll: isDevMode
                    }
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: isDevMode
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            require("postcss-sprites")({
                                spritePath: "./dist/assets/images",
                                retina: true
                            }),
                            require("autoprefixer")()
                        ]
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('node-sass'),
                        sassOptions: {
                            fiber: false,
                        },
                    },
                }]
            }, {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isDevMode ? "[name].[ext]" : "[contenthash].[ext]",
                            limit: 10000, // 10k
                            fallback: 'responsive-loader',
                            quality: 85,
                            outputPath: "./dist/assets/images", // 相对于当前配置文件的
                            publicPath: "../dist/assets/images" // 打包出来的css url前面添加的公共路径
                        },
                    },
                ],
            }, {
                test: /\.(ttf|svg|woff2?|eot)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: isDevMode ? "[name].[ext]" : "[contenthash].[ext]",
                        limit: 8,
                        fallback: "file-loader",
                        outputPath: "./dist/assets/fonts", // 相对于当前配置文件的
                        publicPath: "../dist/assets/fonts", // 打包出来的css url前面添加的公共路径
                    }
                }
            }, {
                test: /\.(wav|mp3)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: isDevMode ? "[name].[ext]" : "[contenthash].[ext]",
                        limit: 8,
                        fallback: "file-loader",
                        outputPath: "./dist/assets/audios", // 相对于当前配置文件的
                        publicPath: "../dist/assets/audios" // 打包出来的css url前面添加的公共路径
                    }
                }
            }, {
                test: /\.(mpeg|mp4|webm|ogv)$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: isDevMode ? "[name].[ext]" : "[contenthash].[ext]",
                        outputPath: "./dist/assets/videos", // 相对于当前配置文件的
                        publicPath: "../dist/assets/videos" // 打包出来的css url前面添加的公共路径
                    }
                }
            }, {
                test: /\.bundle\.js$/i,
                use: {
                    loader: 'bundle-loader',
                    options: {
                        lazy: true,
                        name: 'lazy-import'
                    }
                }
            }
        ]
    },
    plugins: [
        new Webpack.EnvironmentPlugin(["NODE_ENV"]),
        new HtmlWebpackPlugin({
            title: "lle's world",
            template: "./layout/index.html",
            // filename: "index.[hash:5].html",
            minify: {
                collapseWhitespace: !isDevMode
            },
            hash: !isDevMode
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isDevMode ? "style/[name].css" : "style/[name].[contenthash:5].css",
            chunkFilename: isDevMode ? "style/[id].css" : "style/[id].[contenthash:5].css",
            ignoreOrder: false
        })
    ]
};

