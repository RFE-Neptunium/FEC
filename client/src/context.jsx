import React, { useContext, useState } from 'react';

const CurrentProductContext = React.createContext();
const UpdateCurrentProductContext = React.createContext();

export function useCurrentProductContext() {
  return useContext(CurrentProductContext);
}

export function useCurrentProductUpdate(obj) {
  return useContext(UpdateCurrentProductContext);
}
export function CurrentProductProvider({ children }) {
  const [currentProduct, setCurrentProduct] = useState('1');

  function changeCurrentProduct(newProduct) {
    setCurrentProduct(newProduct);
  }

  return (
    <CurrentProductContext.Provider value={currentProduct}>
      <UpdateCurrentProductContext.Provider value={changeCurrentProduct}>
        {children}
      </UpdateCurrentProductContext.Provider>
    </CurrentProductContext.Provider>
  );
}