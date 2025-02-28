"use client";
import { createContext, useState } from "react";
import { useEffect } from "react";
export const CartContext = createContext();

const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    let cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      return JSON.parse(localStorage.getItem("cartItems"));
    }
  } else {
    return [];
  }
};

export const CartProvider = ({ children }) => {

 const [cartItems, setCartItems] = useState(getLocalStorage());

 const addToCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    };
  };

  const removeFromCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );
    // If quantity is equal 1, remove it from the cart
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.name !== item.name));
    } 
    // If quantity is equal 1, subtract 1 from the cart  @ 1 click
    else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
    }
    
  }

  // clear item from cart
  const clearCartItems = () => {
    setCartItems([]);
   
  } 

  // Get the total price from the cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // 0 is the initial value of total
  };

  //Implement local storage to store cart items
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

// checking if cartItems is in the local storage
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
//if cartItems is in the local storage, parse it and set it to cartItems
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

    return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCartItems, getCartTotal }}>{children}</CartContext.Provider>;
}