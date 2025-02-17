// hooks/useFetchProductDetail.ts

// Import useQuery from @tanstack/react-query for data fetching management
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

// Async function to fetch product detail based on ID from the API
const fetchProductDetail = async (id: number): Promise<Product> => {
  // Send request to the API using the product ID as a parameter in the URL
  const response = await fetch(`${apiUrl}/products/${id}`);

  // Log to console for debugging
  console.log(`Fetching product detail for ID: ${id}`);

  // If the API response is not OK, throw an error to be handled by React Query
  if (!response.ok) {
    throw new Error('Failed to fetch product detail');
  }

  // Return the product data in JSON format
  return response.json();
};

// Custom hook to fetch product detail using useQuery
const useFetchProductDetail = (id: number) => {
  // Use useQuery to fetch product data based on ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id], // queryKey is used to differentiate queries based on product ID
    queryFn: () => fetchProductDetail(id), // queryFn is the function that will be called to fetch data
  });

  // Return the product data, loading status, and error message to be used in other components
  return {
    product: data, // Product data (can be null if not yet available)
    loading: isLoading, // Loading status, true if data is still being fetched
    error: isError ? error.message : '', // If an error occurs, display the error message
  };
};

// Export the custom hook to be used in other components
export default useFetchProductDetail;
/*

Main explanation:

React Query (useQuery) is used to automate data fetching.
queryKey: ['product', id] ensures each product with a unique ID gets its own cache.
Automatic error handling: if the request fails, useQuery handles the error without needing useState.
Logging (console.log) for debugging to know when the request is executed.
*/
