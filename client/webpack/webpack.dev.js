const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require('./webpack.common');
const WebpackDevServer = require('webpack-dev-server');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const pkg = require('../package.json');
var port = pkg.clientPort;

const newConfig = merge(config, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [ new webpack.HotModuleReplacementPlugin(), new ReactRefreshPlugin() ],
    output: { publicPath: '//' + pkg.hostname + ':' + pkg.clientPort + '/' },
});

const compiler = webpack(newConfig);
const server = new WebpackDevServer(compiler, {
    static: {
        publicPath: '/',
    },
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port:  pkg.clientPort,
    allowedHosts: "all",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
    }
});

server.listen(port);

