import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Router from './routes/routes';

const app = express();
const http = require('http');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', Router);

app.get('/', (req, res) => {
  res.status(200)
    .send('Welcome to MyDiary App');
});

app.get('*', (req, res) => res.status(404).send({
  message: 'Page Not Found',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;
