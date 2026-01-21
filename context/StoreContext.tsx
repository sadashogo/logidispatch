import React, { createContext, useContext } from "react";

type Store = Record<string, unknown>;

const StoreContext = createContext<Store>({});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={{}}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

export default StoreContext;
