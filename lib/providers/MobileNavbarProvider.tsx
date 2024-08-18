'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type MobileNavbarContextType = {
  isOpen: boolean;
  changeNavBar: () => void;
};

const MobileNavbarContext = createContext<MobileNavbarContextType | undefined>(undefined);

export const MobileNavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const changeNavBar = () => setIsOpen(prevState => !prevState);

  return (
    <MobileNavbarContext.Provider value={{ isOpen, changeNavBar }}>
      {children}
    </MobileNavbarContext.Provider>
  );
};

export const useMobileNavbar = () => {
  const context = useContext(MobileNavbarContext);
  if (!context) {
    throw new Error('useMobileNavbar must be used within a MobileNavbarProvider');
  }
  return context;
};
