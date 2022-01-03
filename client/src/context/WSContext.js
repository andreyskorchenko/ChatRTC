import React, { createContext } from 'react';

const value = new WebSocket('ws://localhost:3030');
const Context = createContext(value);

const WSContext = ({ children }) => {
  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  );
};

export { WSContext, Context };