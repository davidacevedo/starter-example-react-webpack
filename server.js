import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack/common.config';

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler, { log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000 }));
app.use(express.static(`${__dirname}/public`));

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
});
const server = http.createServer(app);
server.listen(port, function() {
  console.log('Listening on: https://localhost:%d', server.address().port);
});