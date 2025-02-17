import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from './CardProduct.module.scss';

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  category: string;
  description?: string;
  image: string;
  onAddToCart: (id: number) => void;
  onAddToWishList: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  category,
  image,
  onAddToCart,
  onAddToWishList,
}) => {
  return (
    <div className={styles.card}>
      {/* Link untuk navigasi ke halaman detail produk */}
      <Link to={`/products/${id}`} className={styles.productLink}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.category}>{category}</p>
          <p className={styles.price}>${price}</p>
        </div>
      </Link>

      {/* Tombol untuk menambah produk ke keranjang */}
      <button
        className={styles.addToCartButton}
        onClick={() => onAddToCart(id)}
      >
        Add to Cart
      </button>

      {/* Tombol untuk menambah produk ke wishlist */}
      <button
        className={styles.addToWishListButton}
        onClick={() => onAddToWishList(id)}
      >
        Add to Wishlist
      </button>
    </div>
  );
};
