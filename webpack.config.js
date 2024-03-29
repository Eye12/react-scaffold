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
const {htmlTitle, entryFileName} = require("./projectInfo/index");
// const CopyPlugin = require('copy-webpack-plugin');
let isDevMode = process.env.NODE_ENV === "development";
let baseOptimization = {
    usedExports: true, // 清除死代码
    runtimeChunk: "single",
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 2
            },
            vendors: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                priority: -10,
                name: "vendors",
                chunks: 'all',
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
};

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: path.resolve(__dirname, "src/" + entryFileName),
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
    devtool: isDevMode ? "cheap-module-inline-source-map" : "cheap-module-source-map",
    // devtool: isDevMode ? "cheap-module-eval-source-map" : "cheap-module-source-map",
    devServer: {
        contentBase: "./dist",
        hot: isDevMode,
        compress: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
        // alias: {}
    },
    node: {
        fs: "empty"
    },
    // externals: {
    //     "React": "react"
    // },
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
                enforce: "pre",
                test: /\.tsx?$/i,
                exclude: /(node_modules|bower_components)/,
                loader: "tslint-loader"
            },
            {
                test: /\.tsx?$/i,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader"
                    }, {
                        loader: "ts-loader"
                    }
                ]
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
                test: /\.(mtl|obj|stl)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./assets/dateFile",
                            // publicPath: "../dist/assets/dateFile"
                        },
                    },
                ],
            }, {
                test: /\.(png|jpg|gif)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: "[name].[ext]",
                            limit: 8192,
                            fallback: 'responsive-loader',
                            quality: 85,
                            outputPath: "./assets/images", // 相对于当前配置文件的
                            // publicPath: "../assets/images" // 打包出来的css url前面添加的公共路径
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
                        limit: 8000,
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
                        limit: 8000,
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
                        name: isDevMode ? "[name].[ext]" : "[hash:5].[ext]",
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
            title: htmlTitle,
            template: "./layout/index.html",
            // filename: "index.[hash:5].html",
            minify: {
                collapseWhitespace: !isDevMode
            },
            favicon: "./favicon.ico",
            hash: !isDevMode
        }),
        // new CopyPlugin([
        //     { from: './assets/images', to: 'assets/dataFile' },
        // ]),
        // new Webpack.ProvidePlugin({
        //     "React": "react",
        //     "ReactDOM": "react-dom"
        // }),
        new MiniCssExtractPlugin({
            filename: isDevMode ? "style/[name].css" : "style/[name].[hash:5].css",
            chunkFilename: isDevMode ? "style/[id].css" : "style/[id].[hash:5].css",
            ignoreOrder: false
        }),
        new CleanWebpackPlugin()
    ]
};

