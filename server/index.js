/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const compression = require('compression');
// require('dotenv').config();
const port = 3000;
const db = require('./db');

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/products', (req, res) => {
  db.getItems((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/products/:product_id', (req, res) => {
  db.getItemByProductId(req.params.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  db.getStylesByProductId(req.params.product_id, (err, data1, data2, data3) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      //console.log('data1', data1, 'data2', data2, 'data3', data3)
      res.status(200).send({ styles: data1, photos: data2, skus: data3 });
    }
  });
});

app.get('/products/:product_id/related', (req, res) => {
  db.getRelatedItemsByProductId(req.params.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port localhost:${port}`);
});
