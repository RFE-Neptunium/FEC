/* eslint-disable max-len */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
require('dotenv').config();
// mongoose.set('debug', true);

const { Schema } = mongoose;
console.log(process.env.URL);

mongoose
  .disconnect()
  .then(mongoose
    .connect(`mongodb://${process.env.URL}:27017/Product`)
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err)),
  )
  .catch((err) => console.log(err))

const FeaturesSchema = new Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String,
});

const PhotosSchema = new Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbnail_url: String,
});

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

const SkusSchema = new Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number,
});

const StylesSchema = new Schema({
  id: Number,
  productId: Number,
  name: String,
  sale_price: String,
  original_price: Number,
  default_style: Number,
});

const Features = mongoose.model('Features', FeaturesSchema);
const Photos = mongoose.model('Photos', PhotosSchema);
const Product = mongoose.model('Product', ProductSchema, 'product');
const RelatedProducts = mongoose.model('RelatedProducts', RelatedProductsSchema);
const Skus = mongoose.model('Skus', SkusSchema);
const Styles = mongoose.model('Styles', StylesSchema);

const getItems = (callback) => {
  Product.find().limit(10)
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => callback(err));
};

const getItemByProductId = (product_id, callback) => {
  Product
    .findOne({ id: product_id }, { _id: 0 })
    .then((product) => {
      Features
        .find({ product_id })
        .then((features) => {
          const data = {
            id: product.id,
            name: product.name,
            slogan: product.slogan,
            description: product.description,
            category: product.category,
            default_price: product.default_price,
            features: [],
          };
          features.forEach((feature) => {
            data.features.push({ feature: feature.feature, value: feature.value });
          });

          callback(null, data);
        })
        .catch((err) => callback(err));
    })
    .catch((err) => callback(err));
};

const getStylesByProductId = (productId, callback) => {
  Styles
    .find({ productId })
    .then((styles) => {
      const ids = [];
      styles.forEach((style) => {
        ids.push(style.id);
      });
      Photos
        .find({ styleId: { $in: ids } })
        .then((photos) => {
          Skus
            .find({ styleId: { $in: ids } })
            .then((skus) => {
              const styleList = [];
              styles.forEach((style) => {
                const styleObj = {
                  id: style.id,
                  name: style.name,
                  sale_price: style.sale_price,
                  original_price: style.original_price,
                  photos: [],
                  skus: [],
                };
                photos.forEach((photo) => {
                  if (photo.styleId === styleObj.id) {
                    styleObj.photos.push({ url: photo.url, thumbnail_url: photo.thumbnail_url });
                  }
                });
                skus.forEach((sku) => {
                  if (sku.styleId === styleObj.id) {
                    styleObj.skus.push({ size: sku.size, quantity: sku.quantity });
                  }
                });
                styleList.push(styleObj);
              });

              callback(null, styleList);
            })
            .catch((err) => callback(err));
        })
        .catch((err) => callback(err));
    })
    .catch((err) => callback(err));
};

const getRelatedItemsByProductId = (current_product_id, callback) => {
  RelatedProducts
    .find({ current_product_id })
    .then((related) => {
      const relatedList = [];
      related.forEach((item) => {
        relatedList.push(item.related_product_id);
      });
      relatedList.sort();

      callback(null, relatedList);
    })
    .catch((err) => callback(err));
};

module.exports = {
  getItems,
  getItemByProductId,
  getStylesByProductId,
  getRelatedItemsByProductId,
};
