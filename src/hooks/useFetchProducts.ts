// hooks/useFetchProducts.ts

// Import useState and useEffect from React for state and side effects
// import axios from 'axios';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
// Get the API URL from environment variable (VITE_API_URL)
// const apiUrl = import.meta.env.VITE_SUPABASE_URL;
// const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Import axios to make HTTP requests

// Define the data type for product (according to the API structure)
interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

// Custom hook to fetch product data from API using Axios
const useFetchProductsWithAxios = () => {
  // State to store the list of products fetched from the API
  const [products, setProducts] = useState<Product[]>([]);

  // State to store the loading status (true when data is being fetched)
  const [loading, setLoading] = useState<boolean>(true);

  // State to store the error message if an error occurs while fetching data
  const [error, setError] = useState<string>('');

  // Fetch product data when the component is first loaded
  useEffect(() => {
    // Async function to fetch product data from the API
    const fetchProducts = async () => {
      try {
        // Fetch data from the API using Axios
        // const response = await axios.get(`${apiUrl}/products`);
        const response = await api.get(`/rest/v1/mini-tokopedia-main-table`);

        // Store the product data in the products state
        setProducts(response.data);

        // After data is received, change the loading status to false
        setLoading(false);
      } catch (err) {
        // If an error occurs, store the error message and change loading to false
        setError(`Failed to fetch products. error message: ${err}`);
        setLoading(false);
      }
    };
    // Run the fetchProducts function when the component is first loaded
    fetchProducts();
  }, []); // Empty dependency array [] means useEffect only runs once when the component first appears

  // Return the products, loading, and error states to be used in other components
  return { products, loading, error };
};

// Export the custom hook to be used in other components
export default useFetchProductsWithAxios;
