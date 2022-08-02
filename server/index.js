/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const compression = require('compression');
// require('dotenv').config();
const port = 3000;
const db = require('./db');
let { product } = require('./cache/products');
const { products } = require('./cache/products');
const { styles } = require('./cache/styles');
const { related } = require('./cache/related');

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/products', (req, res) => {
  if (product) {
    res.status(200).send(product);
  } else {
    db.getItems((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        product = data;
        res.status(200).send(data);
      }
    });
  }
});

app.get('/products/:product_id', (req, res) => {
  // console.log(products);
  if (products[req.params.product_id]) {
    res.status(200).send(products[req.params.product_id]);
  } else {
    db.getItemByProductId(req.params.product_id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        products[req.params.product_id] = data;
        res.status(200).send(data);
      }
    });
  }
});

app.get('/products/:product_id/styles', (req, res) => {
  // console.log(styles);
  if (styles[req.params.product_id]) {
    res.status(200).send(styles[req.params.product_id]);
  } else {
    db.getStylesByProductId(req.params.product_id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        styles[req.params.product_id] = data;
        res.status(200).send(data);
      }
    });
  }
});

app.get('/products/:product_id/related', (req, res) => {
  if (related[req.params.product_id]) {
    res.status(200).send(related[req.params.product_id]);
  } else {
    db.getRelatedItemsByProductId(req.params.product_id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        related[req.params.product_id] = data;
        res.status(200).send(data);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port localhost:${port}`);
});
