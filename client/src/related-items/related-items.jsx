/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { Promise } from 'bluebird';
import ProductList from './productList';
import OutfitList from './outfitList';
import { useCurrentProductContext } from '../context';
import { RelatedItemsStyleContainer } from './styles/list.styled';

export const currentProductDataContext = React.createContext();
const RelatedItems = forwardRef((props, ref) => {
  const [relatedProductStyles, setRelatedProductStyles] = useState();
  const [relatedProduct_ids, setRelatedProduct_ids] = useState();
  const [relatedProductReviews, setRelatedProductReviews] = useState();
  const currentProduct = useCurrentProductContext();
  const [currentProductData, setCurrentProductData] = useState();
  const [currentProductStyles, setCurrentProductStyles] = useState();
  const [currentProductReviews, setCurrentProductReviews] = useState();
  // Context
  //  TODO: Change default state
  //  Will need to be able to show more than the default and update accordingly
  const url = 'http://localhost:3000';
  const getStylesArr = (ids) => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const config = {
        method: 'get',
        url: `${url}/products/${ids[i]}/styles`,
        headers: {
          Authorization: process.env.AUTH_KEY, // TODO: Get rid of this when env is set up!!
        },
      };
      promises.push(axios(config));
    }
    return Promise.all(promises)
      .then((prodObjArr) => {
        const unformattedObjArr = prodObjArr.map((prod) => prod.data);
        unformattedObjArr.map((unformattedObj) => {
          const styleArr = unformattedObj.results;
          unformattedObj.results = styleArr.filter(
            (style) => style['default?'] === true
          );
          if (unformattedObj.results.length === 0) {
            unformattedObj.results = [styleArr[0]];
          }
          return unformattedObj;
        });
        // setRelatedProductStyles(() => unformattedObjArr);
        return unformattedObjArr;
      })
      .catch((err) => console.log('Error:', err));
  };

  // eslint-disable-next-line camelcase
  const get_idsArr = (ids) => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const config = {
        method: 'get',
        url: `${url}/products/${ids[i]}`,
        headers: {
          Authorization: process.env.AUTH_KEY, // TODO: Get rid of this when env is set up!!
        },
      };
      promises.push(axios(config));
    }
    return Promise.all(promises)
      .then((prodObjArr) => {
        // setRelatedProduct_ids(() => prodObjArr.map((product) => product.data));
        return prodObjArr.map((product) => product.data);
      })
      .catch((err) => console.log('Error:', err));
  };

  /* const getReviewsArr = (ids) => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const config = {
        method: 'get',
        url: `${process.env.API_URL}/reviews`,
        params: {
          product_id: ids[i],
          sort: 'relevant',
        },
        headers: {
          Authorization: process.env.AUTH_KEY, // TODO: Get rid of this when env is set up!!
        },
      };
      promises.push(axios(config));
    }
    return Promise.all(promises)
      .then((prodObjArr) => {
        // setRelatedProductReviews(() =>
        //   prodObjArr.map((product) => product.data),
        // );
        return prodObjArr.map((product) => product.data);
      })
      .catch((err) => console.log('Error:', err));
  }; */

  //  relying on the order may introduce a bug
  // const cardFormatter = (reviews, ids, styles) => {
  //   const formattedCards = [];
  //   for (let i = 0; i < ids.length; i++) {
  //     const reviewTotal = reviews[i].results.reduce(
  //       (total, item) => total + item,
  //       0,
  //     );
  //     const reviewAvg = reviewTotal / reviews[i].results.length;
  //     const formattedCard = {
  //       id: styles[i].product_id,
  //       image: styles[i].results[0].photos[0].thumbnail_url,
  //       category: ids[i].category,
  //       name: ids[i].name,
  //       price: styles[i].results[0].original_price,
  //       discountedPrice: styles[i].results[0].sale_price,
  //       rating: reviewAvg,
  //       description: ids[i].description,
  //       features: ids[i].features,
  //     };
  //     formattedCards.push(formattedCard);
  //   }
  //   setCardList(formattedCards);
  //   return formattedCards;
  // };
  //  Feeder for dummy data to setup component.
  const setOverviewDataState = (id) => {
    const configId = {
      method: 'get',
      url: `${url}/products/${id}`,
      /* headers: {
        Authorization: process.env.AUTH_KEY,
      }, */
    };
    const configStyle = {
      method: 'get',
      url: `${url}/products/${id}/styles`,
      /* headers: {
        Authorization: process.env.AUTH_KEY,
      }, */
    };
    /* const configReview = {
      method: 'get',
      url: `${process.env.API_URL}/reviews`,
      params: {
        product_id: id,
        sort: 'relevant',
      },
      headers: {
        Authorization: process.env.AUTH_KEY, // TODO: Get rid of this when env is set up!!
      },
    }; */

    axios
      .all([axios(configStyle), /*axios(configReview),*/ axios(configId)])
      .then(
        axios.spread((...responses) => {
          responses[0].data.results = responses[0].data.results.filter((style) => style['default?'] === true);
          setCurrentProductStyles(responses[0].data);
          /* setCurrentProductReviews(responses[1].data); */
          setCurrentProductData(responses[2].data);
        }),
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductIds = () => {
    const config = {
      method: 'get',
      url: `${url}/products/${currentProduct}/related`,
     /* headers: {
        Authorization: process.env.AUTH_KEY, // TODO: Get rid of this when env is set up!!
      },*/
    };
    axios(config)
      .then((response) => {
        return Promise.all([
          getStylesArr(response.data),
          get_idsArr(response.data),
          /* getReviewsArr(response.data), */
        ]);
      })
      .then((promiseArr) => {
        setRelatedProductStyles(promiseArr[0]);
        setRelatedProduct_ids(promiseArr[1]);
        /* setRelatedProductReviews(promiseArr[2]); */
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => getProductIds(), [currentProduct]);
  useEffect(() => setOverviewDataState(currentProduct), [currentProduct]);

  return (
    <currentProductDataContext.Provider value={currentProductData}>
      <RelatedItemsStyleContainer ref={ref} className="main-widget-container">
        <div className="main-widget-title">RELATED ITEMS</div>
        <ProductList
          relatedProductStyles={relatedProductStyles}
          relatedProduct_ids={relatedProduct_ids}
         /*  relatedProductReviews={relatedProductReviews} */
        />
        <div className="main-widget-title">YOUR OUTFITS</div>
        <OutfitList
          relatedProductStyles={currentProductStyles}
          relatedProduct_ids={currentProductData}
          relatedProductReviews={currentProductReviews}
        />
      </RelatedItemsStyleContainer>
    </currentProductDataContext.Provider>
  );
});
export default RelatedItems;
