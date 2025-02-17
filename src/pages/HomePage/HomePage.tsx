import React, { useCallback } from 'react'; // Import React and useCallback
import styles from './HomePage.module.scss'; // Import SCSS styling for the homepage
import { ProductCard } from '@/components/ui/CardProduct/CardProduct'; // Import component to display products

import useFetchProductsWithAxios from '@/hooks/useFetchProducts'; // Hook to fetch product data
import { useCart } from '@/context/cartContext';
import { useWishList } from '@/context/wishListContext';
import { toast, ToastContainer } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { Navbar } from '../Navbar/Navbar';

export const Homepage: React.FC = () => {
  // Fetch product data and loading/error status from useFetchProducts hook
  const { products, loading, error } = useFetchProductsWithAxios();
  // Get addToCart function from cartContext
  const { addToCart } = useCart();
  // Get addToWishlist function from wishlistContext
  const { addToWishList } = useWishList();
  // 🛑 WITHOUT useCallback: handleAddToCart is recreated on every render
  // ✅ WITH useCallback: handleAddToCart remains the same across renders
  const handleAddToCart = useCallback(
    (product: any) => {
      addToCart(product); // Add product to cart
      // Display toast notification when product is successfully added to cart
      toast.success(`${product.title} has been added to your cart!`, {
        position: 'top-center', // Display toast at the top center
        autoClose: 3000, // Auto close toast after 3 seconds
        hideProgressBar: true, // Hide progress bar
        closeOnClick: true, // Close toast when clicked
        pauseOnHover: true, // Pause animation when toast is hovered
      });
    },
    [addToCart]
  ); // ⚠️ This function only changes if `addToCart` changes

  const handleAddToWishList = useCallback(
    (product: any) => {
      addToWishList(product); // Add product to wishlist
      // Display toast notification when product is successfully added to wishlist
      toast.success(`${product.title} has been added to your wishlist!`, {
        position: 'top-right', // Display toast at the top center
        autoClose: 3000, // Auto close toast after 3 seconds
        hideProgressBar: true, // Hide progress bar
        closeOnClick: true, // Close toast when clicked
        pauseOnHover: true, // Pause animation when toast is hovered
      });
    },
    [addToWishList]
  ); // ⚠️ This function only changes if `addToWishList` changes

  // If products are still loading, display loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  // If there is an error fetching data, display error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.homepage}>
      {/* Navbar on the homepage */}
      <Navbar />

      {/* Homepage header */}
      <header className={styles.header}>
        <h1>Welcome to Mini Tokopedia</h1>
        <p>
          This is a fake eCommerce website, meant for demonstration purposes.
        </p>
        <p>Do not enter your personal data</p>
      </header>

      {/* Main content of the page */}
      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productsGrid}>
          {/* Map each product to display as a card */}
          {products.map((product) => (
            <ProductCard
              key={product.id} // Use product ID as key
              {...product} // Spread operator to pass all product properties
              onAddToCart={() => handleAddToCart(product)} // Function called when "Add to Cart" button is clicked
              onAddToWishList={() => handleAddToWishList(product)} // Function called when "Add to Wishlist" button is clicked
            />
          ))}
        </div>
      </main>

      {/* Page footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 FERDIANSYAH MULYADI. All rights reserved.</p>
      </footer>

      {/* ToastContainer component to display toast notifications */}
      <ToastContainer />
    </div>
  );
};
