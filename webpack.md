#                                                                                                                                 webpack

## 什么是webpack

> A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the application on demand. Through "loaders," modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff.  ——  [https://github.com/webpack/webpack](https://github.com/webpack/webpack)

它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loaders 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。

简而言之：

1. 一个打包工具

2. 一个模块加载工具

3. 各种资源都可以当成模块来处理


## webpack的特点

- **丰富的插件**，方便进行开发工作

  - html-webpack-plugin   自动生成html插件

  - extract-text-webpack-plugin   提取css样式插件

  - autoprefixer   自动检测兼容性补全css前缀

  - webpack.optimize.UglifyJsPlugin()   解析/压缩/美化所有的js



- **大量的加载器**，包括加载各种静态资源
  - 处理样式，转成css，如：less-loader, sass-loader, css-loader, style-loader
  - 图片处理，如: url-loader, file-loader
  - 处理js，将我们写的es6源代码打包时转成es5的代码。如：babel-core，babel-preset-latest，babel-loader


- **代码分割**，提供按需加载的能力

- **智能解析**

  Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、AMD、CMD、ES6 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".vue")。

- **发布工具**
  - 区分开发模式，打包未压缩模式，打包压缩模式，默认是打包未压缩模式

  - 开发模式开启source-map,开启dev-server，可以方便的来调试页面代码，支持实时打包


## webpack与gulp相比有什么优点

| 功能           | gulp                                     | webpack                                  |
| ------------ | :--------------------------------------- | :--------------------------------------- |
| 文件合并与压缩（css） | 使用gulp-minify-css模块                    gulp.task('less',function(){                                                          gulp.src(cssFiles)                                                  .pipe(less()                                              .pipe(require('gulp-minify-css')())     .pipe(gulp.dest(distFolder));                                               }); | 样式合并一般用到                  extract-text-webpack-plugin        插件，压缩则使用webpack.optimize.UglifyJsPlugin。 |
| 文件合并与压缩（js）  | 使用gulp-uglify和gulp-concat两个模块            | js合并在模块化开始就已经做，压缩则使用webpack.optimize.UglifyJsPlugin |
| sass/less预编译 | 使用gulp-sass/gulp-less 模块                 | sass-loader/less-loader 进行预处理            |
| 启动server     | 使用gulp-webserver模块                                                var webserver =require('gulp-webserver');         gulp.task('webserver',function(){                    gulp.src('./')                                               .pipe(webserver({                                         host:'localhost',                                                       port:8080,                                                          livereload:true, //自动刷新                          directoryListing:{                                                              enable: true,                                                                       path:'./'                                                                                     },                                                                                              }));                                                                                            }); | 使用webpack-dev-server模块module.exports = {                           ......                                       devServer: {                       contentBase: "build/",          port:8080,                                        inline: true //实时刷新                          }                                                                 } |
| 文件缓存         | 使用gulp-rev和gulp-rev-collector两个模块        | 将生成文件加上hash值module.exports = {                            ......                                                      output: {                                              ......                                               filename: "[name].[hash:8].js"              },                                                    plugins:[                                              ......                                                         new ExtractTextPlugin("[name].[hash].css")                                            ]                                                                } |

Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。

![](http://upload-images.jianshu.io/upload_images/1031000-d0693c06bb3a00e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。

![](http://upload-images.jianshu.io/upload_images/1031000-160bc667d3b6093a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

总结下来其主要的优势：

1. 按需加载模块，按需进行懒加载，在实际用到某些模块的时候再增量更新

2. webpack 是以 commonJS 的形式来书写脚本，但对 AMD/CMD/ES6 的支持也很全面，方便旧项目进行代码迁移。

3. 能被模块化的不仅仅是 JS 了，能处理各种类型的资源。

4. 开发便捷，能替代部分 gulp 的工作，比如打包、压缩混淆、图片转base64等。

5. 扩展性强，插件机制完善

   ​



## 如何使用webpack

> **demo地址：**[webpack_test](https://github.com/WeberLong/webpack_test)

- *安装webpack**

  ```js
  //全局安装
  npm install -g webpack
  //安装到你的项目目录
  npm install --save-dev webpack
  ```


- **webpack可以在终端中使用**

  ```js
  $ webpack main.js  main.bundle.js  //打包生成main.bundle.js
  $ webpack main.js main.bundle.js --module-bind 'css=style-loader!css-loader' //添加css-loader
  $ webpack --config webpack.conf.js //另一份配置文件
  $ webpack --display-error-details //显示异常信息
  $ webpack --progress //显示打包过程
  $ webpack --display-modules //显示打包模块
  $ webpack --display-reasons //显示打包原因
  $ webpack --watch   //监听变动并自动打包
  $ webpack -p    //压缩混淆脚本，这个非常非常重要！
  $ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
  ```


- **通过配置文件来使用Webpack**

  Webpack拥有很多其它的比较高级的功能（比如说本文后面会介绍的loaders和plugins），这些功能其实都可以通过命令行模式实现，但是正如已经提到的，这样不太方便且容易出错的，一个更好的办法是定义一个配置文件，这个配置文件其实也是一个简单的JavaScript模块，可以把所有的与构建相关的信息放在里面。

  Webpack的配置主要为了这几大项目：

  1. entry：js入口源文件
  2. output：生成文件
  3. Loaders：每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理
  4. resolve：文件路径的指向
  5. plugins：插件，比loader更强大，能使用更多webpack的api

  还是继续上面的例子来说明如何写这个配置文件，在当前练习文件夹的根目录下新建一个名为webpack.config.js的文件，并在其中进行最最简单的配置。

- **入口(Entry) 与 出口(Output)**

  如下所示，它包含入口文件路径和存放打包后文件的地方的路径。

  ```js
  module.exports = {
    entry: './src/js/clickFn.js', // 入口文件
    output: {
      path: path.resolve(__dirname, './dist'), // 编译输出目录
      filename: '[id].[name].[chunkhash:8].js' // 编译输出文件名 我们可以添加hash
    }
  }
  ```


- **加载器(Loaders)**

  webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理。然而 webpack **只理解 JavaScript**。

  **webpack loader 会将这些文件转换为模块，而转换后的文件会被添加到依赖图表中。**并且最终添加到 输出文件bundle.js 中。

  - 如 css-loader 和 style-loader：

  webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

  ```js
  // 安装 style-loader css-loader
  npm install style-loader css-loader --save-dev
  ```

  ```js
  // 使用
  module: {
    rules: [
      {
        // 添加对样式的处理
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 提取css样式插件
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  }
  ```

  ###### 创建style.css文件

  ``` css
  @import './waves.css';
  body {
      background-color: #fff;
  }
  .logo {
      text-align: center;
  }
  .logo img {
      width: 100%;
      height: auto;
  }
  .btn-container {
      text-align: center;
  }
  ```

  ###### 将style.css文件导入到入口文件clickFn.js中

  ```js
  // clickFn.js文件
  import '../css/style.css';
  import Waves from './waves';
  Waves.init();
  document.getElementById("btn").addEventListener("click", function() {
  	clearTimeout(timer);
  	var timer = setTimeout(function() {
  		alert("webpack");
  	}, 500);
  });
  ```
  - 又如 url-loader：

    url-loader的功能类似file-loader，但是在文件大小低于指定的限制时（单位 bytes）可以返回一个 Data Url。

    大小限制可以通过传递查询参数来指定。（默认为无限制）

    如果文件大小大于限制，将转为使用 file-loader，所有的查询参数也会传过去。

  ```js
  // 安装 url-loader
  npm install url-loader --save-dev
  ```

  ```js
  // 配置文件
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name]-[hash:8].[ext]'
        }
      }
    ]
  }
  ```

  ```html
  <!--使用方法-->
  <img src="${require('./img/what-is-webpack.png')}">
  ```

- **插件(Plugins)**

  想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，你需要使用 `new` 创建实例来调用它。

  ```
  npm install extract-text-webpack-plugin --save-dev
  npm install html-webpack-plugin --save-dev
  ```

  ```js
  plugins: [
    new ExtractTextPlugin('[name].[hash:8].css'), // 将 css 文件分离出来
    
    new HtmlWebpackPlugin({ // 导出 index.html 文件
      template: 'src/index.html'
    }),
   
    // Webpack 2.1.0-beta23 之后的config里不能直接包含自定义配置项
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [require('autoprefixer')({
            browsers: ['last 2 versions', 'Android >= 4.0']
          })];
        }
      }
    }),
    
    new webpack.optimize.UglifyJsPlugin({
      // 去除代码块内的告警语句
      compress: {
        warnings: false
      }
    })
  ]
  ```

- **缓存**

  webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前

  ```js
  var path = require('path');
  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  function resolve (dir) {
    console.log('resolveFn: ');
    console.log(path.join(__dirname, '.', dir));
    return path.join(__dirname, '.', dir)
  }

  module.exports = {
    entry: './src/js/clickFn.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[id].[name].[chunkhash:8].js'
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        'src': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name]-[hash:8].[ext]'
          }
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('[name].[hash:8].css'),

      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: function () {
            return [require('autoprefixer')({
              browsers: ['last 2 versions', 'Android >= 4.0']
            })];
          }
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        // 去除代码块内的告警语句
        compress: {
          warnings: false
        }
      })
    ]
  };
  ```

- **使用autoprefixer插件**，自动创建css的前缀(vendor prefixes)

  css有一个很麻烦的问题就是比较新的css属性在各个浏览器里是要加前缀的, 我们可以使用 [autoprefixer](https://github.com/postcss/autoprefixer) 工具自动创建这些浏览器规则。

  在style.css中：

  ```css
  .btn-container a {
      display: flex;
  }
  ```

  autoprefixer会编译成:

  ```css
  .btn-container a {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
  }
  ```

  首先, 我们用npm安装它:

  ```
  npm install postcss-loader autoprefixer --save-dev
  ```

  autoprefixer是 [postcss](http://postcss.org/) 的一个插件, 所以我们也要安装postcss的webpack [loader](https://github.com/postcss/postcss-loader) .

  修改一下webpack的css rule:

  ```js
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader' })
  }
  ```

  在webpack.conf.js的plugins中添加:

  ```js
  // 老版本写法
  // postcss: [
  //   require('autoprefixer')
  // ],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [require('autoprefixer')({
            browsers: ['last 2 versions', 'Android >= 4.0']
          })];
        }
      }
    })
  ]
  ```


- **编译前清空dist目录**

   不清空的话上次编译生成的文件会遗留在dist目录中, 我们最好先把目录清空一下.

   macOS/Linux下可以用 `rm -rf dist` 搞定, 考虑到跨平台的需求, 我们可以用 `rimraf` :

   ```js
   npm install rimraf --save-dev
   ```

    `package.json` 修改一下:	

   ```js
   "scripts": {
     "start": "rimraf dist && webpack --progress --config webpack.conf.js"
   }
   ```

- **开发环境配置**

   webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。它还有一个通过Socket.IO连接着webpack-dev-server服务器的小型运行时程序。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应。

   简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。那么，它能给开发带来什么便利呢？

   **webpack-dev-server有两种模式支持自动刷新——iframe模式和inline模式**

   在inline模式下：一个小型的webpack-dev-server客户端会作为入口文件打包，这个客户端会在后端代码改变的时候刷新页面。

   **使用inline模式有两种方式：**命令行方式和Node.js API配置文件。

   - 命令行方式比较简单，只需加入--line选项即可。

     ```js
     webpack-dev-server --inline --config webpack.config.dev.js
     ```

     使用--inline选项会自动把webpack-dev-server客户端加到webpack的入口文件配置中。

   - Node.js API方式需要手动把`webpack-dev-server/client?http://localhost:8080`加到配置文件的入口文件配置处。

   **webpac-dev-server支持Hot Module Replacement，即模块热替换，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。**

   需要做三个配置：

   - 将webpack编译后输出到内存中的文件资源和热重载中间件(webpack-hot-middleware)挂到express服务器上；

     ```js
     app.use(require('webpack-dev-middleware')(compiler, {
       noInfo: true,
       publicPath: config.output.publicPath
     }));
     app.use(require('webpack-hot-middleware')(compiler));
     ```

   - 把`webpack-hot-middleware/client?reload=true`加入到webpack配置文件的entry项；

     ```js
     entry: {
       main: [
         'eventsource-polyfill',
         'webpack-hot-middleware/client?reload=true',
         './src/js/clickFn.js'
       ]
     }
     ```

   - 把`new webpack.HotModuleReplacementPlugin()`加入到webpack配置文件的plugins项。

     ```js
     plugins: [
       ...
       new webpack.HotModuleReplacementPlugin()
       ...
     ];
     ```

     > **demo地址：**[webpack_test](https://github.com/WeberLong/webpack_test)
