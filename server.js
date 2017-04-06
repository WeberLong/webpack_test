var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config.js');
// var proxyMiddleware = require('http-proxy-middleware');
var app = express();
var compiler = webpack(config);

// 设置资源目录
app.use('/', express.static(path.join(__dirname, '../src')));

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});

// 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  })
});

app.use(devMiddleware);

app.use(hotMiddleware);

// app.use(proxyMiddleware('/api', {
//     target: 'http://www.baidu.com',
//     changeOrigin: true,
// }))

var uri = 'http://127.0.0.1:8000';

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri);
  opn(uri);
});

app.listen(8000, '127.0.0.1', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at ' + uri);
});
