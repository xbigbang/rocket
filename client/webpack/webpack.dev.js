const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require('./webpack.common');
const WebpackDevServer = require('webpack-dev-server');
const pkg = require('../package.json');
var port = pkg.clientPort;

const newConfig = merge(config, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: { publicPath: '//' + pkg.hostname + ':' + pkg.clientPort + '/' },
});

const compiler = webpack(newConfig);
const server = new WebpackDevServer(compiler, {
    static: {
        publicPath: '/',
    },
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port:  pkg.clientPort,
    allowedHosts: "all",
});

server.listen(port);

