// contexts/AppStateContext.tsx

import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface AppState {
  counter: number;
}

const initialState: AppState = {
  counter: 0,
};

const AppStateContext = createContext<{
  admin: Object;
  setAdmin: React.Dispatch<React.SetStateAction<Object>>;
} | null>(null);



export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: React.ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, setState] = useState(initialState);
  // const [admin, setAdmin] = useState(null);
  const [admin, setAdmin] = useLocalStorage('admin', null)

  return (
    <AppStateContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AppStateContext.Provider>
  );
};
