import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishList } from '@/context/wishListContext';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import styles from './Wishlist.module.scss';

export const WishListPage: React.FC = () => {
  const {
    wishList,
    removeFromWishList,
    clearWishList,
    increaseQuantity,
    decreaseQuantity,
  } = useWishList();

  const navigate = useNavigate();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (wishList.length === 0) {
    navigate('/');
  }

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleSubmit = () => {
    alert('Checkout successful! Thank you for your purchase.');
    clearWishList();
    navigate('/');
  };

  return (
    <div className={styles.checkoutPage}>
      {/* Header bagian atas halaman */}
      <header className={styles.header}>
        <h2>Wishlist Belanja</h2>
      </header>

      {/* Jika wishlist tidak kosong, tampilkan item wishlist */}
      {wishList.length > 0 ? (
        <>
          {/* Daftar item yang ada di wishlist */}
          <div className={styles.cartItems}>
            {wishList.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  {/* Menampilkan harga item dengan format Rp */}
                  <p className={styles.itemPrice}>
                    Rp {parseFloat(item.price).toLocaleString()}
                  </p>
                  <div className={styles.quantityControls}>
                    {/* Tombol untuk mengurangi jumlah */}
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    {/* Menampilkan jumlah item dalam cart */}
                    <span className={styles.quantity}>{item.quantity}</span>
                    {/* Tombol untuk menambah jumlah */}
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Tombol untuk menghapus item dari wishlist */}
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromWishList(item.id)}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Footer dengan total harga dan tombol checkout */}
          <div className={styles.footer}>
            <div className={styles.totalPrice}>
              <p>Total Harga:</p>
              {/* Menampilkan total harga dari semua item di cart */}
              <h3>
                Rp{' '}
                {wishList
                  .reduce(
                    (total, item) =>
                      total + parseFloat(item.price) * item.quantity,
                    0
                  ) // Menghitung total harga
                  .toLocaleString()}{' '}
                {/* Format harga agar sesuai dengan format Indonesia */}
              </h3>
            </div>

            {/* Jika form checkout belum ditampilkan, tampilkan tombol checkout */}
            {!showCheckoutForm ? (
              <button
                onClick={handleCheckout}
                className={styles.checkoutButton}
              >
                Checkout
              </button>
            ) : (
              // Jika form checkout sudah ditampilkan, tampilkan CheckoutForm
              <CheckoutForm onSubmit={handleSubmit} />
            )}
          </div>
        </>
      ) : (
        // Jika cart kosong, tampilkan pesan
        <p className={styles.emptyCartMessage}>
          Wishlist Anda kosong. Silakan tambahkan produk untuk melanjutkan.
        </p>
      )}
    </div>
  );
};
