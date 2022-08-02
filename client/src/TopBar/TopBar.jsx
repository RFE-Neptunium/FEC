import React, { useState } from 'react';
import styled from 'styled-components';
import SearchThing from './SearchThing';

const TopBar = function({toggleSearch, handleNewProductClick, searching}) {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <TitleDiv id="top-bar">
      <Div>
        <Link href="https://github.com/rfe-nixos/FEC" target="_blank" rel="noopener noreferrer">
          ABOUT
        </Link>
      </Div>
      <Div>
        <TitleImg
          src="public/icons/nixatelier.png"
          alt="nixatelier"
          onClick={refresh}
        />
      </Div>
      <RightDiv>
        <TitleInner onClick={toggleSearch}>SEARCH</TitleInner>
      </RightDiv>
      {(searching) && (<SearchThing handleNewProductClick={handleNewProductClick} />)}
    </TitleDiv>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 12px;
  letter-spacing: 5px;
  align-items: center;
  width: 30%;
  height: 100%;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  height: 100%;
`;

const Link = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30%;
  height: 100%;
  &:link { text-decoration: none; }
  &:visited { text-decoration: none; }
  &:hover { cursor: pointer; opacity: 60%;}
  &:active { text-decoration: none; }
`;

const TitleImg = styled.img`
  position: absolute;
  z-index: 200;
  left: 50%;
  max-height: 50px;
  min-height: 10px;
  size: auto;
  align-self: center;
  transform: translate(-50%, 0%);
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const TitleInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  letter-spacing: 5px;
  &:hover{
    cursor: pointer;
    opacity: 60%;
  }
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  margin-left: 10%;
`;

const TitleDiv = styled.div`
  width: 70%;
  min-width: 700px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  font-weight: 300;
  padding: 2%;
  font-size: 30px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  margin-bottom: 1%;
  margin-top: 1%;
  border-bottom: .5px solid black;
`;

export default TopBar;
