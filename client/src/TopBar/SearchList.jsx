import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchTile from './SearchTile';

function SearchList({ products, query, handleNewProductClick }) {
  useEffect(() => {
    console.log('search list loaded');
  }, []);

  return (
    <StyledList>
      {(products.map((product) => (
        <SearchTile
          product={product}
          key={product.id}
          handleNewProductClick={handleNewProductClick}
        />
      )))}
    </StyledList>

  );
}

const StyledList = styled.div`
z-index: 200;
  margin: 2%;
  max-height: 300px;
  width: 80%;
  overflow-y: auto;
  letter-spacing: 0px;
  font-weight: 500;
`;

export default SearchList;
