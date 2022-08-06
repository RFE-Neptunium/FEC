/* eslint-disable max-len */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

mongoose
  .disconnect()
  .then(mongoose
    .connect(`mongodb://${process.env.URL}:27017/Product`)
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err)))
  .catch((err) => console.log(err));

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
});

const PhotosSchema = new Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbnail_url: String,
});

const RelatedProducts = mongoose.model('RelatedProducts', RelatedProductsSchema);
const Products = mongoose.model('Products', ProductsSchema, 'products');
const StylesList = mongoose.model('StylesList', StylesListSchema, 'styleslist');
const Photos = mongoose.model('Photos', PhotosSchema);

const getItems = (callback) => {
  Products.find().collation({ locale: 'id' }).limit(100)
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
    .then((styles) => {
      const ids = [];
      styles.forEach((style) => {
        ids.push(style.id);
      });

      Photos
        .find({ styleId: { $in: ids } })
        .then((photos) => {
          const styleArr = [];
          styles.forEach((style) => {
            const styleObj = {
              id: style.id,
              name: style.name,
              sale_price: style.sale_price,
              original_price: style.original_price,
              skus: style.skus,
              photos: [],
            };
            photos.forEach((photo) => {
              if (photo.styleId === styleObj.id) {
                styleObj.photos.push({ url: photo.url, thumbnail_url: photo.thumbnail_url });
              }
            });
            styleArr.push(styleObj);
          });
          callback(null, styleArr);
        })
        .catch((err) => callback(err));
    });
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
