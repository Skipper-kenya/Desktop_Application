import React, { createContext, useState } from 'react';

export interface LoadingState {
  loading: boolean;
  setLoading: any;
}

export const loadingContext = createContext<LoadingState | null>(null);

interface GlobalChildNode {
  children: React.ReactNode;
}

const GlobalContext: React.FC<GlobalChildNode> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const values = { loading, setLoading };

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </loadingContext.Provider>
  );
};

export default GlobalContext;
