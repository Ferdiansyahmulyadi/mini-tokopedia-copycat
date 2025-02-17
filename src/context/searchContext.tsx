import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the data type for the search context
interface SearchContextType {
  searchQuery: string; // The search query to be stored
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Function to update the searchQuery
}

// Create context for search
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to use SearchContext
export const useSearch = () => {
  // Get the created context
  const context = useContext(SearchContext);

  // If context is not found, throw an error
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Type for the props received by SearchProvider
interface SearchProviderProps {
  children: ReactNode; // Child components that will be given the context
}

// SearchProvider is a wrapper component to provide context access to all child components
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  return (
    // Provide context to child components
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

/*
Flow Explanation:
SearchContextType: This is the type for the context we create. Here, there are two properties:

searchQuery: A string that stores the search query.
setSearchQuery: A function to change the value of searchQuery.
SearchContext: Context created using createContext(). This context will share the values of searchQuery and setSearchQuery to all child components within the SearchProvider.

useSearch: This hook will be used to access the SearchContext. If the hook is used outside of the SearchProvider, it will throw an error because the context will not be available.

SearchProvider: This component acts as a wrapper that provides context to all its child components. Inside it, the searchQuery state is managed using useState(), and this value along with the setSearchQuery function is shared through the context.

Usage:
Components that want to access searchQuery and setSearchQuery can use the useSearch hook after wrapping their application with SearchProvider.
*/
