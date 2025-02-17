// useProducts.ts

import { useState, useEffect } from 'react';
import axios from 'axios';

// API URL to fetch product data from FakeStoreAPI
const API_URL = 'https://fakestoreapi.com/products';

// Custom Hook to manage product data
export const useProducts = () => {
  // State to store the list of products
  const [products, setProducts] = useState<any[]>([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to capture errors
  const [error, setError] = useState(null);
  // State to determine if there are more pages
  const [hasNextPage, setHasNextPage] = useState(true);
  // State for fetching additional data status
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // useEffect to fetch data when the component is first used
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch product data from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data); // Save product data to state
    } catch (err: any) {
      setError(err.message); // Capture error if any
    } finally {
      setIsLoading(false); // Set loading to false after request is complete
    }
  };

  /** ✅ Function to add a new product */
  const addProduct = async (newProduct: any) => {
    try {
      const response = await axios.post(API_URL, newProduct);

      // Since FakeStoreAPI doesn't actually save new products,
      // we add it manually to the state
      const createdProduct = {
        id: products.length + 1, // Manual ID because the API doesn't save data
        ...newProduct,
      };

      setProducts([createdProduct, ...products]); // Add product to the list
      return true; // Successfully added product
    } catch {
      return false; // Failed to add product
    }
  };

  /** ✅ Function to update a product by ID */
  const updateProduct = async (id: number, updatedProduct: any) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
      return true; // Successfully updated product
    } catch {
      return false; // Failed to update product
    }
  };

  /** ✅ Function to delete a product by ID */
  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // Remove from state
      return true; // Successfully deleted product
    } catch {
      return false; // Failed to delete product
    }
  };

  /** ✅ Function to fetch the next page of products */
  const fetchNextPage = async () => {
    if (!hasNextPage || isFetchingNextPage) return; // If there are no more pages or currently fetching, stop the process
    setIsFetchingNextPage(true);
    try {
      const response = await axios.get(API_URL);
      setProducts([...products, ...response.data]); // Add new products to the list
    } catch {
      setHasNextPage(false); // If failed, mark that there are no more pages
    } finally {
      setIsFetchingNextPage(false); // Set fetching status to false
    }
  };

  // Return all states and functions that can be used in other components
  return {
    products, // List of products
    addProduct, // Function to add product
    updateProduct, // Function to update product
    deleteProduct, // Function to delete product
    fetchNextPage, // Function to fetch the next page
    hasNextPage, // Status if there are more pages
    isFetchingNextPage, // Status of fetching the next page
    isLoading, // Initial loading status
    error, // Error if any
  };
};
