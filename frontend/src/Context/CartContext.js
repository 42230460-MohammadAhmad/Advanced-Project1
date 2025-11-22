import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (dish) => {
    const exists = cartItems.find(item => item.id === dish.id);
    if (exists) {
      setCartItems(
        cartItems.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems(
      cartItems.map(item => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      status: "Pending",
    };
    setOrders([...orders, newOrder]);
    setCartItems([]); // Clear cart after placing order
  };

  const updateOrderStatus = (id, status) => {
    setOrders(
      orders.map(order => (order.id === id ? { ...order, status } : order))
    );
  };

  // New function to delete an order completely
  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      placeOrder,
      orders,
      updateOrderStatus,
      deleteOrder // included here
    }}>
      {children}
    </CartContext.Provider>
  );
}
