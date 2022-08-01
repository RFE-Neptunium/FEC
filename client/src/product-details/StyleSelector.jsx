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
      if (style.style.id === parseInt(event.target.alt)) {
        newStyle = style.style;
      }
    });
    setCurrentStyle(newStyle);
  };

  const styleList = [];

  styles.styles.forEach((style) => {
    // console.log(style);
    const styleId = style.id;
    const photos = styles.photos.filter((photo) => {
      if (photo.styleId === styleId) {
        return photo;
      }
    });
    if (style.id === currentStyle.style.id) {
      styleList.push(
        <div key={style.name} className="styleOption">
          <img src={checkmark} alt="checkmark" id="styleOverlay" />
          <img src={photos[0].thumbnail_url} alt={styleId} onClick={handleClick} />
        </div>,
      );
    } else {
      styleList.push(
        <div key={style.name} className="styleOption">
          <img src={photos[0].thumbnail_url} alt={styleId} onClick={handleClick} />
        </div>,
      );
    }
  });

  return (
    <div className="styleSelector">
      <p className="currentStyleSelector">{currentStyle.style.name}</p>
      {styleList}
    </div>
  );
}

export default StyleSelector;
