const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/MANAGE-SERVICE', {
            target: 'http://192.168.1.8:9000/MANAGE-SERVICE',
            changeOrigin: true,
            pathRewrite: {
                '^/MANAGE-SERVICE': ''
            }
        })
    );
};