var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {

    devtool: "eval-source-map", //配置生成Source Maps，选择合适的选项
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build", //打包后的文件存放的地方
        filename: "bundle.js"

    },
    devServer: {
        // contentBase: "./public", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true
    },
    module: {
        rules: [{
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }],
            },
            {
                test: /\.css$/,
                use: ["style-loader",
                        {
                            loader: "css-loader",
                            options: {}
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: function() {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                    ] //添加对样式表的处理
            }

        ]
    },
    // postcss: [
    //     require('autoprefixer') ////调用autoprefixer插件
    // ],
    plugins: [
        // new webpack.BannerPlugin("Copyright Flying Unicorns inc.") //在这个数组中new一个就可以了
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new ExtractTextPlugin("[name]-[hash].css") //防止缓存
    ]
}