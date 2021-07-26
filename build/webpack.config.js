const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
//拆分css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//拆分多个css
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexLess = new ExtractTextWebpackPlugin('index.less');
let indexCss = new ExtractTextWebpackPlugin('index.css');
//解析vue文件
const vueLoaderPlugin = require('vue-loader/lib/plugin')
//配置webpack-dev-server进行热更新
const Webpack = require('webpack')
module.exports = {
  mode: 'development', // 开发模式
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    header: path.resolve(__dirname, '../src/header.js'),
    // ["@babel/polyfill",path.resolve(__dirname,'../src/index.js')] //通过借助babel-polyfill转换ES6/7/8的新api
  }, // 入口文件 path.resolve在当前目录执行cd操作，从左到右执行，返回最后的当前目录
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist') // 打包后的目录   __dirname：当前模块目录名
  },
  plugins: [
    // 多入口文件开发
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/header.html'),
      filename: 'header.html',
      chunks: ['header'] // 与入口文件对应的模块名
    }),
    //打包前清空dist文件夹
    new CleanWebpackPlugin(),
    //拆分css
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    //拆分多个css
    indexLess,
    indexCss,
    //解析vue文件
    new vueLoaderPlugin(),
   //配置webpack-dev-server进行热更新
    new Webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 从右向左解析原则
      },
      /* 引入autoprefixer，为css添加浏览器前缀 */
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', {
      //     loader: 'postcss-loader',
      //     options: {
      //       plugins: [require('autoprefixer')]
      //     }
      //   }, 'less-loader'] // 从右向左解析原则
      // }

      /*  
     拆分css
      */
      // {
      //   test: /\.less$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'less-loader'
      //   ],
      // }

      /*  
      拆分多个CSS
       */
      {
        test: /\.css$/,
        use: indexCss.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: indexLess.extract({
          use: ['css-loader', 'less-loader']
        })
      },
      /* 
      打包 图片、字体、媒体、等文件
       */
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
      //用babel转义js文件
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      //解析vue文件
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      ' @': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
}