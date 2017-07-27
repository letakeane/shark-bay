const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const domain = process.env.DOMAIN_ENV || 'localhost:1975';
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

app.set('port', process.env.PORT || 1975);

app.locals.title = 'shark-bay';

app.get('/', (request, response) => {
  response.sendFile('index.html')
  response.sendFile('./styles/index.css')
  response.sendFile('./scripts/index.js')
});

app.get('/api/v1/sharks', (request, response) => {
  database('sharks').select()
    .then((sharks) => {
      if (sharks.length) {
        response.status(200).json(sharks);
      } else {
        response.status(404).json({
          error: 'No sharks found'
        });
      }
    })
  .catch((error) => {
    response.status(500).json({ error });
  })
});

app.get('/api/v1/sharks/:id', (request, response) => {
  database('sharks').where('id', request.params.id).select()
  .then((shark) => {
    response.status(200).json(shark);
  })
  .catch((error) => {
    response.status(500).json({ error });
  })
});

app.get('/api/v1/orders', (request, response) => {
  database('order_history').select()
    .then((orders) => {
      if (orders.length) {
        response.status(200).json(orders);
      } else {
        response.status(404).json({
          error: 'No orders found'
        });
      }
    })
  .catch((error) => {
    response.status(500).json({ error });
  })
});

app.post('/api/v1/orders', (request, response) => {
  const order = request.body;

  database('order_history').insert(order, 'id')
    .then((orderId) => {
      response.status(201).json({ id: orderId[0] });
    })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

module.exports = app;
