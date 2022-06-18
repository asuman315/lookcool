// //import { hydrogenMiddleware } from '@shopify/hydrogen/middleware.js';
// const { hydrogenMiddleware } = require('@shopify/hydrogen/middleware.js');
// //import serveStatic from 'serve-static';
// const serveStatic = require('serve-static');
// //import compression from 'compression';
// const compression = require('compression');
// //import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
// //import connect from 'connect';
// const connect = require('connect');
// //import path from 'path';
// const path = require('path');
// //import { fileURLToPath } from 'url';
// const { fileURLToPath } = require('url');

// const port = process.env.PORT || 8080;
// // Initialize your own server framework like connect
// const app = connect();
// // Add desired middlewares and handle static assets
// app.use(compression());

// //const __filename = fileURLToPath(import.meta.url);
// //const __dirname = path.dirname(__filename);
// app.use(serveStatic(path.resolve(__dirname, '../', 'client'), { index: false }));

// app.use(bodyParser.raw({ type: '*/*' }));

// app.use(
//  '*',
//  hydrogenMiddleware({
//   getServerEntrypoint: () => import('./src/App.server'),
//   indexTemplate: () => import('./dist/client/index.html?raw'),
//   // Optional: Provide a strategy for caching in production
//   //cache: customCacheImplementation,
//  })
// );

// // app.use((req, res) => {
// //  res.send(`<h1 styles={text-align: 'center'}>LOOKCOOL APP</h1>`);
// // })

// app.listen(port, () => {
//  console.log(`Hydrogen server running at http://localhost:${port}`);
// });

require('@shopify/hydrogen/web-polyfills');
const fs = require('fs');
const handleRequest = require('./dist/node');
const indexTemplate = fs.readFileSync('./dist/client/index.html', 'utf-8');
module.exports = function (request, response) {
 handleRequest(request, {
  indexTemplate,
  streamableResponse: response,
 });
};