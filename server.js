import { hydrogenMiddleware } from '@shopify/hydrogen/middleware.js';
import serveStatic from 'serve-static';
import compression from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 8080;

// Initialize your own server framework like connect
const app = express();

// Add desired middlewares and handle static assets
app.use(compression());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(serveStatic(path.resolve(__dirname, '../', 'client'), { index: false }));

app.use(bodyParser.raw({ type: '*/*' }));

app.use(
 '*',
 hydrogenMiddleware({
  getServerEntrypoint: () => import('./src/App.server'),
  indexTemplate: () => import('./dist/client/index.html?raw'),
  // Optional: Provide a strategy for caching in production
  //cache: customCacheImplementation,
 })
);

app.use((req, res) => {
 res.send(`<h1 styles={text-align: 'center'}>LOOKCOOL APP</h1>`);
})


console.log(__dirname);

app.listen(port, () => {
 console.log(`Hydrogen server running at http://localhost:${port}`);
});