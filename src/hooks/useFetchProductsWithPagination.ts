// hooks/useFetchProductsWithPagination.ts

// Import the useQuery hook from @tanstack/react-query for automatic state management
import { useQuery } from '@tanstack/react-query';

// Get the API URL from environment variable (e.g., in the .env file)
const apiUrl = import.meta.env.VITE_API_URL;

// Define the data type for product to ensure type safety in TypeScript
interface Product {
  id: number; // Unique ID of the product
  title: string; // Product name
  price: string; // Product price as a string
  category: string; // Product category
  description: string; // Product description
  image: string; // Product image URL
}

// Async function to fetch product data from the API with pagination
const fetchProducts = async (
  page: number, // Page number to fetch
  limit: number // Number of products to fetch per page
): Promise<Product[]> => {
  // Send request to the API with page and limit parameters in the URL
  const response = await fetch(
    `${apiUrl}/products?page=${page}&limit=${limit}`
  );

  // Log to console for debugging
  console.log(`Fetching products for page ${page} with limit ${limit}`);

  // If the API response is not OK, throw an error to be handled by React Query
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  // Return the product data in JSON format
  return response.json();
};

// Custom hook to fetch product data using useQuery with pagination
const useFetchProductsWithPagination = (page: number, limit: number) => {
  // Use useQuery to automatically fetch product data and manage loading, error, and data states
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, limit], // queryKey is used to differentiate queries based on page and limit
    queryFn: () => fetchProducts(page, limit), // queryFn is the function that will be called to fetch data
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes before being refetched
    // cacheTime: 1000 * 60 * 10, // Data will remain in cache for 10 minutes before being removed
  });

  // Return the product data, loading status, and error message to be used in other components
  return {
    products: data || [], // If data is not available, return an empty array to avoid errors
    loading: isLoading, // Loading status, true if data is still being fetched
    error: isError ? error.message : '', // If an error occurs, display the error message
  };
};

// Export the custom hook to be used in other components
export default useFetchProductsWithPagination;

/*

Main explanation:

React Query (useQuery) is used to handle data fetching automatically.
queryKey helps differentiate data based on page and limit.
staleTime and cacheTime manage when data should be refreshed and when it should be removed from cache.
Automatic state management: isLoading, isError, and data from useQuery make state management simpler compared to using useState + useEffect.
*/
