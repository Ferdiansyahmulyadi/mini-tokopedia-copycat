// Import React to use JSX and create components
import React from 'react';

// Import React Router to manage navigation (page transitions)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages that will be displayed based on the URL
import { Homepage } from '@/pages/HomePage/HomePage'; // Main page
import { Checkout } from '@/pages/Checkout/Checkout'; // Checkout page
import { SearchPage } from '@/pages/SearchPage/SearchPage'; // Search page

// Import Context Providers (global state management)
import { CartProvider } from '@/context/cartContext'; // Store shopping cart state
import { SearchProvider } from '@/context/searchContext'; // Store search state

// Import React Query for caching data from API
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../queryClient'; // Query client configuration

// Import additional pages
import PageWithPagination from '@/pages/PageWithPagination/PageWithPagination'; // Page with pagination feature
import ProductDetail from '@/pages/ProductDetail/ProductDetail'; // Product detail page based on ID
// import { MyStore } from '@/pages/MyStore/MyStore';
import { WishListProvider } from '@/context/wishListContext';
import { WishListPage } from '@/pages/WishList/Wishlist';

// Create the main Home component that manages all pages and global state
export const Home: React.FC = () => {
  return (
    // Wrap the application with QueryClientProvider to enable API data caching
    <QueryClientProvider client={queryClient}>
      {/* Wrap the application with CartProvider to make cart state available anywhere */}
      <CartProvider>
        {/* Wrap the application with WishListProvider to make wishlist state available anywhere */}
        <WishListProvider>
          {/* Wrap the application with SearchProvider to make search state available anywhere */}
          <SearchProvider>
            {/* Router to manage navigation in the application */}
            <Router>
              {/* List of routes (navigation paths) in the application */}
              <Routes>
                {/* If the user opens "/", display the main page */}
                <Route path='/' element={<Homepage />} />
                {/* If the user opens "/checkout", display the checkout page */}
                <Route path='/checkout' element={<Checkout />} />
                {/* If the user opens "/wishlist", display the wishlist page */}
                <Route path='/wishlist' element={<WishListPage />} />
                {/* If the user opens "/search", display the search page */}
                <Route path='/search' element={<SearchPage />} />
                {/* If the user opens "/page-pagination", display the page with pagination feature */}
                <Route
                  path='/page-pagination'
                  element={<PageWithPagination />}
                />
                {/* If the user opens "/products/:id", display the product detail page based on ID */}
                <Route path='/products/:id' element={<ProductDetail />} />
                {/* My Store page */}
                {/* <Route path='/my-store' element={<MyStore />} /> */}
              </Routes>
            </Router>
          </SearchProvider>
        </WishListProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};
