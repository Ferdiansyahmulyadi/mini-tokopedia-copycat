import React, { useContext, createContext, useReducer } from 'react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface WishListItem extends Product {
  quantity: number;
}

interface WishListState {
  items: WishListItem[];
}

type WishListAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'INCREASE_QUANTITY'; payload: number }
  | { type: 'DECREASE_QUANTITY'; payload: number };

const wishListReducer = (
  state: WishListState,
  action: WishListAction
): WishListState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'CLEAR_WISHLIST': {
      return {
        items: [],
      };
    }

    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${_exhaustiveCheck}`);
    }
  }
};

interface WishListContextProps {
  wishList: WishListItem[];
  addToWishList: (product: Product) => void;
  removeFromWishList: (id: number) => void;
  clearWishList: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

const WishListContext = createContext<WishListContextProps | undefined>(
  undefined
);

interface WishListProviderProps {
  children: React.ReactNode;
}

export const WishListProvider: React.FC<WishListProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(wishListReducer, { items: [] });

  const addToWishList = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishList = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const clearWishList = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  return (
    <WishListContext.Provider
      value={{
        wishList: state.items,
        addToWishList,
        removeFromWishList,
        clearWishList,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
};
