import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [showElement, setShowElement] = useState(false);

  const toggleElement = () => {
    setShowElement(!showElement);
  };

  return (
    <AppContext.Provider value={{ showElement, toggleElement }}>
      {children}
    </AppContext.Provider>
  );
}