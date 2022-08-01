/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const compression = require('compression');
// require('dotenv').config();
const port = 3000;

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public'), {
  setHeaders: function (res, path, stat) {
    res.set('Cache-Control', 'max-age=31536000')
  }
}));

app.get('/products', function (req, res) {

  db.getItems((err, data) => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }

  });

});

app.get(`/products/:product_id`, function (req, res) {
  console.log(req.params.product_id);

  db.getItemByProductId(req.params.product_id, (err, data) => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }

  });

});

app.get(`/products/:product_id/styles`, function (req, res) {

  db.getStylesByProductId(req.params.product_id, (err, data1, data2, data3) => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send([data1, data2, data3]);
    }

  });

});

app.get(`/products/:product_id/related`, function (req, res) {

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
