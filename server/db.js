/* eslint-disable max-len */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

mongoose
  .disconnect()
  .then(mongoose
    .connect(`mongodb://${process.env.URL}:27017/Products`)
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err)))
  .catch((err) => console.log(err));

const ProductSchema = new Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
});

const RelatedProductsSchema = new Schema({
  id: Number,
  current_product_id: Number,
  related_product_id: Number,
});

const ProductsSchema = new Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{
    id: Number,
    product_id: Number,
    feature: String,
    value: String,
  }],
});

const StylesListSchema = new Schema({
  id: Number,
  productId: Number,
  name: String,
  sale_price: String,
  original_price: Number,
  default_style: Number,
  skus: [{
    id: Number,
    styleId: Number,
    size: String,
    quantity: Number,
  }],
  photos: [{
    id: Number,
    styleId: Number,
    url: String,
    thumbnail_url: String,
  }],
});

const Product = mongoose.model('Product', ProductSchema, 'product');
const RelatedProducts = mongoose.model('RelatedProducts', RelatedProductsSchema);
const Products = mongoose.model('Products', ProductsSchema, 'products');
const StylesList = mongoose.model('StylesList', StylesListSchema, 'styleslist');

const getItems = (callback) => {
  Product.find().collation({ locale: 'id' }).limit(100)
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => callback(err));
};

const getItemByProductId = (product_id, callback) => {
  Products
    .findOne({ id: product_id })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err));
};

const getStylesByProductId = (productId, callback) => {
  StylesList
    .find({ productId })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err));
};

const getRelatedItemsByProductId = (current_product_id, callback) => {
  RelatedProducts
    .find({ current_product_id })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err));
};

module.exports = {
  getItems,
  getItemByProductId,
  getStylesByProductId,
  getRelatedItemsByProductId,
};
