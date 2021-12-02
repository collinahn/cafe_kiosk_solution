const createProxyMiddleware = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000/",
      changeOrigin: true,
    })
  );
};
