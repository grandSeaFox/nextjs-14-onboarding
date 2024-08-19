'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DriverTourContextType = {
  isDriveTourOngoing: boolean;
  changeDriveTour: () => void;
};

const DriverTourContext = createContext<DriverTourContextType | undefined>(undefined);

export const DriverTourProvider = ({ children }: { children: ReactNode }) => {
  const [isDriveTourOngoing, setIsDriveTourOngoing] = useState(false);

  const changeDriveTour = () => setIsDriveTourOngoing(prevState => !prevState);

  return (
    <DriverTourContext.Provider value={{isDriveTourOngoing, changeDriveTour  }}>
      {children}
    </DriverTourContext.Provider>
  );
};

export const useDriverTour = () => {
  const context = useContext(DriverTourContext);
  if (!context) {
    throw new Error('useDriverTour must be used within a DriverTourProvider');
  }
  return context;
};
