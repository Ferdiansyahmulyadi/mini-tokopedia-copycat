import React, { useState } from 'react';
import useFetchProductsWithPagination from '@/hooks/useFetchProductsWithPagination'; // Import custom hook for fetching data
import styles from './PageWithPagination.module.scss'; // Import SCSS module for styling

// Main component to display the list of products with pagination
const PageWithPagination: React.FC = () => {
  // State to store the current page
  const [page, setPage] = useState(1);
  const limit = 5; // Number of items displayed per page

  // Call custom hook to fetch product data based on the page number
  const { products, loading, error } = useFetchProductsWithPagination(
    page,
    limit
  );

  // Display loading while data is being fetched
  if (loading) return <div className={styles.container}>Loading...</div>;

  // Display error if there is an error while fetching data
  if (error) return <div className={styles.container}>{`Error: ${error}`}</div>;

  return (
    <div className={styles.container}>
      <h1>Product List</h1>

      {/* Product List */}
      <div className={styles.productList}>
        {products?.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.image} alt={product.title} />{' '}
            {/* Display product image */}
            <h2>{product.title}</h2> {/* Display product name */}
            <p>{product.description}</p> {/* Display product description */}
            <p className={styles.price}>${product.price}</p>{' '}
            {/* Display product price */}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        {/* Prev button to go to the previous page, disabled if already on page 1 */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &larr; Prev
        </button>

        {/* Display the current page number */}
        <span>Page {page}</span>

        {/* Next button to go to the next page */}
        <button onClick={() => setPage((prev) => prev + 1)}>&rarr; Next</button>
      </div>
    </div>
  );
};

// Export the component to be used elsewhere
export default PageWithPagination;
