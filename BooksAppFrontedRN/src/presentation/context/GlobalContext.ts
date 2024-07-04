import React, { createContext, useContext, useState } from 'react';

interface GlobalContextProps {
  usernameId: number;
  setUsernameId: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
