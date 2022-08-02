/* eslint-disable max-len */
import React, { useState, useEffect, useTransition } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchList from './SearchList';

function SearchThing({ toggleSearch, handleNewProductClick }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  const getProducts = () => {
    axios.get('http://localhost:3000/products', {
      /* headers: {
        Authorization: process.env.AUTH_KEY,
      }, */
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log('error fetching products', err));
  };

  const filterProducts = () => {
    const f = products
      .filter((product) => (product.name.match(new RegExp(query, 'i'))
          || product.description.match(new RegExp(query, 'i'))
          || product.category.match(new RegExp(query, 'i'))
          || product.slogan.match(new RegExp(query, 'i'))));
    setFiltered(f);
  };

  useEffect(() => {
    filterProducts();
  }, [query]);

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    startTransition(() => {
      if (e.target.value.length >= 3) {
        setFilter(e.target.value);
      } else {
        setFilter('');
      }
    });
  };

  const handleBgClick = (e) => {
    if (e.target.id === 'searchmain-bg') {
      toggleSearch();
    }
  };

  return (
    <StyledForm onClick={handleBgClick} id="searchmain-bg">
      <StyledInner id="searchmain-inner">
        SEARCH FOR AN ITEM HERE
        <StyledInput placeholder="i.e. shoes" name="searchthing" onChange={handleChange} />
        {(filter) && <SearchList query={filter} products={filtered} handleNewProductClick={handleNewProductClick} />}
        <StyledButton onClick={toggleSearch}>CLOSE</StyledButton>
      </StyledInner>
    </StyledForm>
  );
}

const StyledInput = styled.input`
  z-index: 200;
  width: 200px;
  margin: 4%;
  transition: 1s;
  height: auto;
  font-size: 30px;
  color: #828282;
  letter-spacing: 0px

`;

const StyledForm = styled.div`
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const StyledInner = styled.div`
  z-index: 200;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 500px;
  height: auto;
  padding: 1.5%;
  overflow-y: auto;
  background: #ffffff;
  color: #5c5c5c;
  border: 1px solid black;
  font-size: small;
  font-weight: 200;
  letter-spacing: 5px;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`;

const StyledButton = styled.button`
  z-index: 200;
  width: auto;
  max-width: 100px;
  font-size: small;
  margin: 3%;
  padding: 0.25em 1em;
  background: white;
  color: #5c5c5c;
  border: .6px solid #5c5c5c;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

export default SearchThing;
