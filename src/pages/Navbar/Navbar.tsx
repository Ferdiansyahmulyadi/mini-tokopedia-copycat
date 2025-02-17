import React, { useState } from 'react';
import { useCart } from '../../context/cartContext'; // Get data from CartContext
import { useWishList } from '../../context/wishListContext'; // Get data from WishListContext
import { useSearch } from '../../context/searchContext'; // Get data from SearchContext
import { useNavigate } from 'react-router-dom'; // For navigation to other pages
import styles from './Navbar.module.scss';
import MiniTokopedia from '@/assets/tokopedia.png'; // Logo used in the navbar

export const Navbar: React.FC = () => {
  // Get cart data and functions from CartContext
  const { cart } = useCart();
  // Get wishlist data and functions from WishListContext
  const { wishList } = useWishList();
  // Get searchQuery and setSearchQuery function from SearchContext
  const { searchQuery, setSearchQuery } = useSearch();
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage whether the cart dropdown is open or not
  const navigate = useNavigate(); // Function to navigate to other pages

  // Function to toggle the open/close status of the cart dropdown
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Function to navigate to the Checkout page
  const goToCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout'); // Navigate to the checkout page if there are items in the cart
    } else {
      alert('Your cart is empty!'); // Show alert if the cart is empty
    }
  };

  // Function to navigate to wishlist page
  const goToWishlist = () => {
    if (wishList.length > 0) {
      navigate('/wishlist'); // Navigate to the wishlist page if there are items in the wishlist
    } else {
      alert('Your wishlist is empty!'); // Show alert if the wishlist is empty
    }
  };

  // Function to handle input changes in the search bar
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update searchQuery whenever the input changes
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    // Navigate to the search page when the button is clicked
    navigate('/search');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo and website name */}
        <div className={styles.logo}>
          <img src={MiniTokopedia} alt='MiniTokopedia' />
          <p>MINI TOKOPEDIA</p>
        </div>

        {/* Search bar */}
        <div className={styles.searchBar}>
          <input
            type='text'
            placeholder='Search for products...'
            value={searchQuery} // Bind input with searchQuery value
            onChange={handleSearchChange} // Update searchQuery when input changes
          />
          <button onClick={handleSearchClick}>Search</button>{' '}
          {/* Button to start the search */}
        </div>

        {/* Navbar menu */}
        <div className={styles.menu}>
          <a href='/' className={styles.menuItem}>
            Home
          </a>
          <a href='#categories' className={styles.menuItem}>
            Categories
          </a>
          {/* <a href='/my-store' className={styles.menuItem}>
            MyStore
          </a> */}

          {/* Shopping cart icon */}
          <div className={styles.cartIcon} onClick={goToCheckout}>
            🛒
            <span className={styles.cartCount}>{cart.length}</span>{' '}
            {/* Display the number of items in the cart */}
          </div>
          {/* Wishlist icon */}
          <div className={styles.wishListIcon} onClick={goToWishlist}>
            ❤️
            <span className={styles.wishListCount}>{wishList.length}</span>{' '}
            {/* Display the number of items in the cart */}
          </div>
        </div>
      </div>

      {/* Cart dropdown, only appears if isCartOpen is true */}
      {isCartOpen && (
        <div className={styles.cartDropdown}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p> // Display message if the cart is empty
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>
                    1 x ${parseFloat(item.price).toFixed(2)}{' '}
                    {/* Display item price */}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </nav>
  );
};
