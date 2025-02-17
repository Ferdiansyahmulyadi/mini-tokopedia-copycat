// useInfiniteProducts.ts

import { useInfiniteQuery } from '@tanstack/react-query'; // 🔥 Import React Query for infinite scrolling
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

/** ✅ Function to fetch product data with pagination */
const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const response = await axios.get(`${API_URL}?_page=${pageParam}&_limit=10`);
  return response.data ?? []; // 🔥 Ensure to return an array, to avoid returning undefined/null
};

export const useInfiniteProducts = () => {
  /** ✅ Using useInfiniteQuery to fetch data */
  const {
    data, // Fetched data (divided into pages)
    fetchNextPage, // Function to fetch the next page
    hasNextPage, // Boolean: is there a next page?
    isFetchingNextPage, // Boolean: is the next page being fetched?
    isLoading, // Boolean: is the data being loaded?
    error, // If there is an error
  } = useInfiniteQuery({
    queryKey: ['products'], // 🔥 Unique key for cache query
    queryFn: fetchProducts, // 🔥 Data fetching function
    initialPageParam: 1, // 🔥 Initial page is 1
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length < 10)
        return null; // 🔥 If data is less than 10 items, stop pagination
      return allPages.length + 1; // 🔥 Fetch the next page based on the number of existing pages
    },
  });

  return {
    products: data?.pages?.flat() ?? [], // 🔥 Combine all pages into one array (flattening)
    fetchNextPage, // 🔥 Function to fetch the next page
    hasNextPage: hasNextPage ?? false, // 🔥 Boolean: is there more data?
    isFetchingNextPage, // 🔥 Is the next page being loaded?
    isLoading, // 🔥 Is the initial data being loaded?
    error, // 🔥 Error if any
  };
};
