"use client";

// cart context
import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);

  // cart total state
  const [cartTotal, setCartTotal] = useState(0);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  // update item amount
  useEffect(() => {
    const amount = cart.reduce((a, c) => {
      return a + c.amount;
    }, 0);
    setItemAmount(amount);
  }, [cart]);

  // update cart total price
  useEffect(() => {
    const price = cart.reduce((a, c) => {
      return a + Number(c.price) * c.amount;
    }, 0);
    setCartTotal(price);
  }, [cart]);

  // add to cart
  // const addToCart = (id, name, price, image, size) => {
  //   const newItem = {
  //     id,
  //     name,
  //     price,
  //     image,
  //     size,
  //     amount: 1,
  //   };
  //   const cartItemIndex = cart.findIndex(
  //     (item) => item.id === id && item.price === price && item.size === size
  //   );

  //   if (cartItemIndex === -1) {
  //     setCart([...cart, newItem]);
  //   } else {
  //     const newCart = [...cart];
  //     newCart[cartItemIndex].amount += 1;
  //     setCart(newCart);
  //   }
  // };
  const addToCart = useCallback((id, name, price, image, size) => {
    const newItem = { id, name, price, image, size, amount: 1 };
    setCart((prevCart) => {
      const cartItemIndex = prevCart.findIndex(
        (item) => item.id === id && item.price === price && item.size === size
      );

      if (cartItemIndex === -1) {
        return [...prevCart, newItem];
      } else {
        const updatedCart = [...prevCart];
        updatedCart[cartItemIndex].amount += 1;
        return updatedCart;
      }
    });
  }, []);

  // remove item
  const removeItem = (id, price, size) => {
    const itemIndex = cart.findIndex(
      (item) => item.id === id && item.price === price && item.size === size
    );

    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(itemIndex, 1);
      setCart(newCart);
    }
  };

  // increase amount
  const increaseAmount = (id, price) => {
    const itemIndex = cart.findIndex(
      (item) => item.id === id && item.price === price
    );

    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].amount += 1;
      setCart(newCart);
    }
  };

  // decrease amount
  // const decreaseAmount = useCallback(id, price) => {
  //   const itemIndex = cart.findIndex(
  //     (item) => item.id === id && item.price === price
  //   );
  //   if (itemIndex !== -1) {
  //     const newCart = [...cart];
  //     newCart[itemIndex].amount -= 1;
  //     if (newCart[itemIndex].amount <= 0) {
  //       newCart.splice(itemIndex, 1);
  //     }
  //     setCart(newCart);
  //   }
  // };

  const decreaseAmount = useCallback((id, price) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id && item.price === price) {
            const updatedAmount = item.amount - 1;
            if (updatedAmount <= 0) return null;
            return { ...item, amount: updatedAmount };
          }
          return item;
        })
        .filter((item) => item !== null);
    });
  }, []);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        setCart,
        itemAmount,
        cartTotal,
        removeItem,
        increaseAmount,
        decreaseAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
