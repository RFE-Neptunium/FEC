/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import checkmark from './assets/checkmark.png';

function StyleSelector({
  styles, currentStyle, setCurrentStyle,
}) {
  const handleClick = (event) => {
    const styleList = Object.values(styles);
    let newStyle;
    styleList.forEach((style) => {
      if (style.id === parseInt(event.target.alt)) {
        newStyle = style;
      }
    });
    setCurrentStyle(newStyle);
  };

  const styleList = [];

  styles.forEach((style) => {
    if (style.id === currentStyle.id) {
      styleList.push(
        <div key={style.name} className="styleOption">
          <img src={checkmark} alt="checkmark" id="styleOverlay" />
          <img src={style.photos[0].thumbnail_url} alt={style.id} onClick={handleClick} />
        </div>,
      );
    } else {
      styleList.push(
        <div key={style.name} className="styleOption">
          <img src={style.photos[0].thumbnail_url} alt={style.id} onClick={handleClick} />
        </div>,
      );
    }
  });

  return (
    <div className="styleSelector">
      <p className="currentStyleSelector">{currentStyle.name}</p>
      {styleList}
    </div>
  );
}

export default StyleSelector;
