// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import { useSearch } from '@/context/searchContext'; // Get searchQuery from SearchContext
import { ProductCard } from '@/components/ui/CardProduct/CardProduct'; // Component to display each product
import { useCart } from '@/context/cartContext'; // Get addToCart function to add products to the cart
import { useWishList } from '@/context/wishListContext'; // Get addToWishList function to add products to the wishlist
import { useLocation } from 'react-router-dom'; // Get URL information to get the search query
import styles from './SearchPage.module.scss'; // Import styling file for the search page

// Interface for product data type
interface Product {
  id: number; // Unique product ID
  title: string; // Product name
  price: string; // Product price
  category: string; // Product category
  description: string; // Product description
  image: string; // Product image URL
}

// Main component for the search page
export const SearchPage: React.FC = () => {
  // Store fetched product data
  const { addToCart } = useCart(); // Get cart data and function to add products to the cart
  const { addToWishList } = useWishList(); // Get wishlist data and function to add products to the wishlist
  const [products, setProducts] = useState<Product[]>([]); // State to store products fetched from the API
  const location = useLocation(); // Get current URL information
  const { searchQuery } = useSearch(); // Get search query from SearchContext

  // Get query parameter from URL (example: ?query=iphone)
  const queryParams = new URLSearchParams(location.search); // Get query parameters from URL
  const query = queryParams.get('query') || searchQuery; // Get query value from URL, or fallback to searchQuery in context

  // Fetch product data from API using useEffect
  useEffect(() => {
    // Fetch product data from API
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json()) // Convert response to JSON format
      .then((data) => setProducts(data)) // Store product data in 'products' state
      .catch((error) => console.error(error)); // Handle error if fetch fails
  }, []); // This effect runs only once when the component is first mounted

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) => product.title.toLowerCase().includes(query.toLowerCase()) // Filter products whose titles contain the search query
  );

  // Render the search page
  return (
    <div className={styles.searchPage}>
      <header className={styles.header}>
        <h1>Search Results</h1> {/* Page title */}
        <p>Showing results for: &quot;{query}&quot;</p>{' '}
        {/* Display the search keyword */}
      </header>

      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Products</h2>{' '}
        {/* Section title for products */}
        <div className={styles.productsGrid}>
          {/* If there are products matching the search query */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id} // Use product ID as key
                {...product} // Spread product properties as props for ProductCard
                onAddToCart={() => addToCart(product)} // Function to add product to the cart
                onAddToWishList={() => addToWishList(product)} // Empty function for adding to wishlist
              />
            ))
          ) : (
            // If no products match, display a message
            <p>No products found for &quot;{query}&quot;</p>
          )}
        </div>
      </main>
    </div>
  );
};

/*
Component and Functionality Explanation:
Imports:

React: Used to create components and manage state.
useEffect and useState: Hooks from React to fetch product data and store the results in state.
useSearch: Custom hook that accesses searchQuery from search context to get the search keyword.
useCart: Custom hook to access cart functions and data (like addToCart).
useLocation: Hook from react-router-dom to get query string from URL.
ProductCard: Component that displays product information in a card format.
styles: SCSS file for styling the search page.
State and Variables:

products: State that stores the list of products fetched from the API.
query: Value used to search for products. This can come from the URL or from the searchQuery context.
filteredProducts: List of products filtered based on the query.
useEffect:

useEffect is used to fetch product data from the API when the component is first mounted. After fetching the product data, the results are stored in the products state.
Filtering Products:

After fetching the products, we filter them based on the search keyword (query). Products whose titles contain the keyword will be displayed.
Render Page:

In the render, if there are products matching the query, we display them in a grid using the ProductCard component. If no products are found, we display a message "No products found".
For each product, we also add an onAddToCart function that calls the addToCart function from the cartContext to add the product to the cart.
Using ProductCard:

The ProductCard component is used to display product information such as name, price, and image.
Each product also has a button or action to add the product to the cart.
Conclusion:
This search page allows users to search for products based on keywords entered in the URL or through the search context.
Products matching the query will be displayed in a grid format.
Users can add products to their shopping cart directly from the search page.
*/
