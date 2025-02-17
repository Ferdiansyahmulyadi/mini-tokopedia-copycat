import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Used for navigation between pages
import { useCart } from '@/context/cartContext'; // Access cart context to get state and actions
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'; // Checkout form component
import styles from './Checkout.module.scss'; // Import SCSS styling for the checkout page

export const Checkout: React.FC = () => {
  // Get data from cartContext such as cart items and cart manipulation functions
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // For navigation to other pages
  const navigate = useNavigate();

  // State to show or hide the checkout form
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Redirect if cart is empty
  if (cart.length === 0) {
    navigate('/'); // Redirect user to the homepage if cart is empty
  }

  // Function to show the checkout form
  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Function to handle checkout form submission
  const handleSubmit = () => {
    alert('Checkout successful! Thank you for your purchase.');
    clearCart(); // Clear the cart after checkout
    navigate('/'); // Redirect user back to the homepage after checkout
  };

  return (
    <div className={styles.checkoutPage}>
      {/* Header section of the page */}
      <header className={styles.header}>
        <h2>Shopping Cart</h2>
      </header>

      {/* If cart is not empty, display cart items */}
      {cart.length > 0 ? (
        <>
          {/* List of items in the cart */}
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  {/* Display item price in Rp format */}
                  <p className={styles.itemPrice}>
                    Rp {parseFloat(item.price).toLocaleString()}
                  </p>
                  <div className={styles.quantityControls}>
                    {/* Button to decrease quantity */}
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    {/* Display item quantity in the cart */}
                    <span className={styles.quantity}>{item.quantity}</span>
                    {/* Button to increase quantity */}
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Button to remove item from cart */}
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Footer with total price and checkout button */}
          <div className={styles.footer}>
            <div className={styles.totalPrice}>
              <p>Total Price:</p>
              {/* Display total price of all items in the cart */}
              <h3>
                ${' '}
                {cart
                  .reduce(
                    (total, item) =>
                      total + parseFloat(item.price) * item.quantity,
                    0
                  ) // Calculate total price
                  .toLocaleString()}{' '}
                {/* Format price to match Indonesian format */}
              </h3>
            </div>
            {/* If checkout form is not shown, display checkout button */}
            {!showCheckoutForm ? (
              <button
                onClick={handleCheckout}
                className={styles.checkoutButton}
              >
                Checkout
              </button>
            ) : (
              // If checkout form is shown, display CheckoutForm
              <CheckoutForm onSubmit={handleSubmit} />
            )}
          </div>
        </>
      ) : (
        // If cart is empty, display message
        <p className={styles.emptyCartMessage}>
          Your cart is empty. Please add products to continue.
        </p>
      )}
    </div>
  );
};
/*
Flow Explanation:
State and functions used:

showCheckoutForm: State used to show or hide the checkout form.
handleCheckout: Function that will show the checkout form when the "Checkout" button is clicked.
handleSubmit: Function that runs when the checkout form is submitted, displaying an alert that checkout was successful, clearing the cart, and redirecting the user to the homepage.
Navigation and Redirect:

If the cart is empty, the user is redirected to the homepage using navigate("/").
Cart Item List:

In the cart items section, each item is rendered with an image, title, price, and controls to change the quantity (increase or decrease).
There is also a button to remove the item from the cart.
Footer:

In the footer section, the total price is calculated based on the quantity and price of each item in the cart.
If the checkout form is not shown, the "Checkout" button will appear. If the checkout form is shown, the form will appear.
Empty Cart Message:
*/
