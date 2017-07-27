const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const domain = process.env.DOMAIN_ENV || 'localhost:1975';
const jwt = require('jsonwebtoken');
const userToken = process.env.TOKEN;
require('dotenv').config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
   next();
});

app.set('secretKey', process.env.CLIENT_SECRET);

app.set('port', process.env.PORT || 1975);

app.locals.title = 'shark-bay';

app.get('/', (request, response) => {
  response.sendFile('index.html')
  response.sendFile('./styles/index.css')
  response.sendFile('./scripts/index.js')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})

// const token = jwt.sign({username: process.env.USERNAME, password: process.env.PASSWORD}, app.get('secretKey'), {
//   expiresIn: 604800
// });
// console.log('Token: ', token);

module.exports = app;
