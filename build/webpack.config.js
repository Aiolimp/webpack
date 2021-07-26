
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    mode: 'development', // 开发模式
    entry: {
        main:path.resolve(__dirname, '../src/main.js'),
        header:path.resolve(__dirname, '../src/header.js'),
        
    },    // 入口文件 path.resolve在当前目录执行cd操作，从左到右执行，返回最后的当前目录
    output: {
        filename:  '[name].[hash:8].js',     // 打包后的文件名称
        path: path.resolve(__dirname, '../dist')  // 打包后的目录   __dirname：当前模块目录名
    },
    plugins:[
        // 多入口文件开发
        new HtmlWebpackPlugin({
          template:path.resolve(__dirname,'../public/index.html'),
          filename:'index.html',
          chunks:['main'] // 与入口文件对应的模块名
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/header.html'),
            filename:'header.html',
            chunks:['header'] // 与入口文件对应的模块名
          }),
          new CleanWebpackPlugin() //打包前清空dist文件夹
      ],
      module:{
        rules:[
          {
            test:/\.css$/,
            use:['style-loader','css-loader'] // 从右向左解析原则
          },
          {
            test:/\.less$/,
            use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
          }
        ]
      }
}
