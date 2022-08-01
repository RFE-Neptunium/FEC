const mongoose = require('mongoose');
// mongoose.set('debug', true);

const { Schema } = mongoose;

mongoose
  .disconnect()
  .then(mongoose
    .connect('mongodb://localhost:27017/Products')
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err))
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
const Product = mongoose.model('Product', ProductSchema);
const RelatedProducts = mongoose.model('RelatedProducts', RelatedProductsSchema);
const Skus = mongoose.model('Skus', SkusSchema);
const Styles = mongoose.model('Styles', StylesSchema);

const getItems = (callback) => {

  Product.find().limit(10)
    .then(results => {
      callback(null, results)
    })
    .catch(err => callback(err));

};

const getItemByProductId = (product_id, callback) => {

  Product
    .findOne({ "id": product_id })
    .then((product) => {
      Features
        .find({ "product_id": product_id })
        .then((features) => {
          product.features = features;
          callback(null, product);
        })
        .catch(err => callback(err));
    })
    .catch(err => callback(err));

};

const getStylesByProductId = (product_id, callback) => {

  // Styles.findOne().then((res) => console.log(res));

  Styles
    .find({ "productId": product_id })
    .then((styles) => {
      let ids = [];
      styles.forEach(style => ids.push(style.id));
      ids.sort();
      console.log(ids);
      Photos
        .find({ styleId: { $in: ids } })
        .then((photos) => {
          Skus
            .find({ styleId: { $in: ids } })
            .then(skus => {
              callback(null, styles, photos, skus);
            })
            .catch(err => callback(err));
        })
        .catch(err => callback(err));

    })
    .catch(err => callback(err));

};

const getRelatedItemsByProductId = (product_id, callback) => {

  RelatedProducts
    .find({ "current_product_id": product_id })
    .then((related) => {
      callback(null, related);
    })
    .catch(err => callback(err));

};

module.exports = {
  getItems,
  getItemByProductId,
  getStylesByProductId,
  getRelatedItemsByProductId
}