/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/self-closing-comp */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import { ShareSocial } from 'react-share-social';
import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, TwitterShareButton, TwitterIcon } from 'react-share';
/* import Star from '../RatingsReviews/Ratings/Star'; */
import priceFormat from '../TopBar/lib/priceFormat';

function ProductDetails({ product, currentStyle, /* productReviews, ratingsRef */}) {
  /* if (Object.keys(productReviews.ratings).length > 0) {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = (event) => {
      !showNav ? setShowNav(true) : setShowNav(false);
    };

    const scrollDown = (event) => {
      window.scrollTo({
        top: ratingsRef.current.offsetTop, // scrolls to location of ref
        behavior: 'smooth',
      });
      toggleNav();
    };

    let averageRating = 0;
    let totalRatings = 0;
    for (let i = 1; i <= 5; i += 1) {
      averageRating += parseInt(productReviews.ratings[i]) * i;
      totalRatings += parseInt(productReviews.ratings[i]);
    }

    averageRating /= totalRatings;
    averageRating = averageRating.toFixed(2);

    if (currentStyle.sales_price) {
      return (
        <div className="productDetails">
          <p id="category">{product.category}</p>
          <h1 id="title">{product.name}</h1>
          <div id="rating">
            <div className="starRating">
              <Star average={averageRating} />
            </div>
            <div onClick={scrollDown}>
              <h3 className="totalRatings">Read all {totalRatings} review(s)</h3>
            </div>
          </div>
          <div className="saleOutlay">
            <h3 id="nonPrice">{'$' + currentStyle.original_price}</h3>
            <h3 id="salesPrice">{currentStyle.sales_price}</h3>
          </div>
          <p id="overview">{product.description}</p>
          <FacebookShareButton url={window.location.href} className="share">
            <FacebookIcon className="share" />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} className="share">
            <TwitterIcon className="share" />
          </TwitterShareButton>
          <PinterestShareButton url={window.location.href} media={window.location.href} className="share">
            <PinterestIcon className="share" />
          </PinterestShareButton>
        </div>
      );
    }
    return (
      <div className="productDetails">
        <p id="category">{product.category}</p>
        <h1 id="title">{product.name}</h1>
        <div id="rating">
          <div className="starRating">
            <Star average={averageRating} />
          </div>
          <div onClick={scrollDown}>
            <h4 className="totalRatings">Read all {totalRatings} review(s)</h4>
          </div>
        </div>
        <h3 id="price">{priceFormat(currentStyle.original_price)}</h3>
        <p id="overview">{product.description}</p>
        <FacebookShareButton url={window.location.href} className="share">
          <FacebookIcon className="share" />
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href} className="share">
          <TwitterIcon className="share" />
        </TwitterShareButton>
        <PinterestShareButton url={window.location.href} media={window.location.href} className="share">
          <PinterestIcon className="share" />
        </PinterestShareButton>
      </div>
    );
  } */

  if (currentStyle.sales_price) {
    return (
      <div className="productDetails">
        <p id="category">{product.product.category}</p>
        <h1 id="title">{product.product.name}</h1>
        <div className="saleOutlay">
          <h3 id="nonPrice">{'$' + currentStyle.style.original_price}</h3>
          <h3 id="salesPrice">{currentStyle.style.sales_price}</h3>
        </div>
        <p id="overview">{product.product.description}</p>
        <FacebookShareButton url={window.location.href} className="share">
          <FacebookIcon className="share" />
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href} className="share">
          <TwitterIcon className="share" />
        </TwitterShareButton>
        <PinterestShareButton url={window.location.href} media={window.location.href} className="share">
          <PinterestIcon className="share" />
        </PinterestShareButton>
      </div>
    );
  }

  return (
    <div className="productDetails">
      <p id="category">{product.product.category}</p>
      <h1 id="title">{product.product.name}</h1>
      <h3 id="price">{'$' + currentStyle.style.original_price}</h3>
      <p id="overview">{product.product.description}</p>
      <FacebookShareButton url={window.location.href} className="share">
        <FacebookIcon className="share" />
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href} className="share">
        <TwitterIcon className="share" />
      </TwitterShareButton>
      <PinterestShareButton url={window.location.href} media={window.location.href} className="share">
        <PinterestIcon className="share" />
      </PinterestShareButton>
    </div>
  );
}

export default ProductDetails;
