/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/self-closing-comp */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, TwitterShareButton, TwitterIcon } from 'react-share';

function ProductDetails({ product, currentStyle }) {
  if (currentStyle.sales_price) {
    return (
      <div className="productDetails">
        <p id="category">{product.category}</p>
        <h1 id="title">{product.name}</h1>
        <div className="saleOutlay">
          <h3 id="nonPrice">{'$' + currentStyle.original_price}</h3>
          <h3 id="salesPrice">{currentStyle.sale_price}</h3>
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
      <h3 id="price">{'$' + currentStyle.original_price}</h3>
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

export default ProductDetails;
