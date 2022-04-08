const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/FB_Functions",
    createProxyMiddleware({
      target: `https://us-central1-happening-82070.cloudfunctions.net/webApi/api/v1`,
      changeOrigin: true,
      pathRewrite: {
        "^/FB_Functions/*": "",
      },
    })
  );
  app.use(
    "/DB_Server",
    createProxyMiddleware({
      target: "https://happenininfo.ca/",
      changeOrigin: true,
      pathRewrite: {
        "^/DB_Server/*": "",
      },
    })
  );
};

// module.exports = function (app) {
//   app.use(
//     "/DB_Server",
//     createProxyMiddleware({
//       target: "http://142.93.144.14",
//       changeOrigin: true,
//     })
//   );
//
//   );
//   //   app.use(
//   //     "/api_to_external_website",
//   //     createProxyMiddleware({
//   //       target:
//   //         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false",
//   //       headers: {
//   //         accept: "application/json",
//   //         method: "GET",
//   //       },
//   //       changeOrigin: true,
//   //     })
//   //   );
// };
