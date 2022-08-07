/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const webpack = require("webpack")
const dotEnv = require("dotenv-webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

const version = require("./package.json").version

/**
 * See [Webpack Configuration docs](https://webpack.js.org/configuration/) for more information.
 *
 * @type {import("webpack").Configuration}
 */
const webpackConfig = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js",
        // filename: "[name].[chunkhash:8].dist.js",
        // filename: "[name].dist.js",
    },
    mode: "development",
    devtool: "eval-source-map",
    /** @type {import("webpack").Configuration} */
    devServer: {
        static: [
            {
                directory: path.join(__dirname, "dist"),
            },
        ],
        historyApiFallback: true,
        port: 8090,
        allowedHosts: "all",
        hot: true,
    },
    plugins: [
        new dotEnv({
            path: path.resolve(__dirname, ".env"),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            hash: true,
            inject: true,
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify({
                VERSION: `v${version}`,
                NODE_ENV: "development",
            }),
        }),
        // new webpack.EvalSourceMapDevToolPlugin({}),
        // new webpack.SourceMapDevToolPlugin({
        //     filename: null,
        //     exclude: [/node_modules/],
        //     test: /\.tsx?($|\?)/i,
        // }),
    ],
    resolve: {
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
        modules: [__dirname, "src", "node_modules"],
        fallback: {
            console: false,
        },
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                enforce: "pre",
                test: /\.(ts|js)x?/,
                use: ["source-map-loader"],
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
            // {
            //     test: /\.(png|svg)/,
            //     type: "asset/resource",
            // },
        ],
    },
}

module.exports = webpackConfig
