import React, { createContext, useContext, useReducer } from 'react';

// Define type for product in the cart
interface Product {
  id: number; // Product ID
  title: string; // Product name
  price: string; // Product price
  category: string; // Product category
  description: string; // Product description
  image: string; // Product image URL
}

// CartItem is a product in the cart that has a quantity
interface CartItem extends Product {
  quantity: number; // Quantity of the product in the cart
}

// CartState is the type for storing all items in the cart
interface CartState {
  items: CartItem[]; // List of items in the cart
}

// CartAction is the type of actions that can be performed to change the cart data
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product } // Add product to cart
  | { type: 'REMOVE_FROM_CART'; payload: number } // Remove product by id
  | { type: 'CLEAR_CART' } // Clear all products in the cart
  | { type: 'INCREASE_QUANTITY'; payload: number } // Increase product quantity by id
  | { type: 'DECREASE_QUANTITY'; payload: number }; // Decrease product quantity by id

// Reducer is a function that changes the state based on the received action
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Check if the product is already in the cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      // If it exists, just increase the quantity
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // Increase product quantity
              : item
          ),
        };
      }

      // If it doesn't exist, add the product to the cart with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }], // Add new product to cart
      };
    }

    case 'REMOVE_FROM_CART': {
      // Remove product by id from the cart
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload), // Remove product with matching id
      };
    }

    case 'CLEAR_CART': {
      // Clear all products in the cart
      return { items: [] };
    }

    case 'INCREASE_QUANTITY': {
      // Increase product quantity by id
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 } // Increase product quantity by 1
            : item
        ),
      };
    }

    case 'DECREASE_QUANTITY': {
      // Decrease product quantity, ensure quantity is not less than 1
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 } // Decrease by 1 if quantity > 1
              : item
          )
          .filter((item) => item.quantity > 0), // Ensure no product has quantity 0 or less
      };
    }

    default: {
      // If an unrecognized action is received, throw an error
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${_exhaustiveCheck}`);
    }
  }
};

// CartContextProps defines what is available in the Cart Context
interface CartContextProps {
  cart: CartItem[]; // All items in the cart
  addToCart: (product: Product) => void; // Function to add product to cart
  removeFromCart: (id: number) => void; // Function to remove product from cart
  clearCart: () => void; // Function to clear the cart
  increaseQuantity: (id: number) => void; // Function to increase product quantity
  decreaseQuantity: (id: number) => void; // Function to decrease product quantity
}

// Create Context to store cart data that can be accessed throughout the application
const CartContext = createContext<CartContextProps | undefined>(undefined);

// CartProvider is a component that provides cart data and functions to the application
export const CartProvider: React.FC = ({ children }) => {
  // Use useReducer to manage cart state
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Function to add product to cart
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product }); // Dispatch action to add product
  };

  // Function to remove product from cart by id
  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id }); // Dispatch action to remove product
  };

  // Function to clear all products in the cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' }); // Dispatch action to clear all products
  };

  // Function to increase product quantity in the cart
  const increaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id }); // Dispatch action to increase product quantity
  };

  // Function to decrease product quantity in the cart
  const decreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id }); // Dispatch action to decrease product quantity
  };

  // Provide access to cart values and functions to other components
  return (
    <CartContext.Provider
      value={{
        cart: state.items, // Provide cart data
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children} {/* Provide CartContext to all child components */}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext in other components
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // Ensure hook is used within CartProvider
  }
  return context; // Return context containing cart data and functions
};

/*
Brief explanation:
CartProvider: This component provides all cart-related data and functions (add, remove, clear, update quantity) to be accessed by other components in the application.
Reducer: cartReducer is a function to change the cart state based on the dispatched action, such as adding a product, removing a product, or updating product quantity.
useCart: This hook allows components to easily access cart state and functions without directly accessing the context.
*/
