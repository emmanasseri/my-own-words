import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Create the context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Custom hook to use the LoadingContext
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// Provider component to wrap around your app
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false); // Manage global loading state

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
