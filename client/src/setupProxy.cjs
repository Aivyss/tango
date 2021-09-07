import createProxyMiddleware from 'http-proxy-middleware';

const setProxySetting = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5001',
            changeOrigin: true,
        }),
    );
};
export default setProxySetting;
