const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');


const server = express();
server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
require('dotenv').config();
const { API_ENV } = process.env;
if (API_ENV !== 'silent') {
    const morgan = require('morgan');
    server.use(morgan('dev'));
}
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res) => {
    const status = err.status || 500, message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;
