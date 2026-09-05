import { createContext, useState, useEffect, useCallback, useMemo } from "react";

const CartContext = createContext();

const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartItemsFromLocalStorage);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleAddToCart = useCallback((product) => {
    const productSelected = cart.find(
      (singleCart) => singleCart._id === product._id
    );
    if (productSelected) {
      setCart(
        cart.map((oneItem) =>
          oneItem._id === product._id
            ? {
                ...productSelected,
                quantity: productSelected.quantity + 1,
              }
            : oneItem
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }, [cart]);

  const value = useMemo(() => ({
    handleAddToCart,
    cart,
    setCart
  }), [cart, handleAddToCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
