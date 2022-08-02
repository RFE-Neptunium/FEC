/* eslint-disable radix */
/* eslint-disable max-len */
import React, { useState } from 'react';
import styled from 'styled-components';
import Overview from './product-details/Overview';
import TopBar from './TopBar/TopBar';
import BotBar from './TopBar/BotBar';

function App() {
  const [productId, setProductId] = useState({});
  const [searching, setSearching] = useState(false);
  const url = 'http://localhost:3000/products';

  const toggleSearch = () => {
    if (!searching) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  };

  const handleNewProductClick = (event) => {
    setProductId(parseInt(event.target.id));
    toggleSearch();
  };

  if (typeof productId !== 'number') {
    setProductId(1);
  }
  if (typeof productId === 'number') {
    return (
      <MainDiv>
        <TopBar toggleSearch={toggleSearch} handleNewProductClick={handleNewProductClick} searching={searching} />
        <div>
          <Overview productId={productId} url={url} />
        </div>
        <BotBar />
      </MainDiv>
    );
  }
}

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default App;
