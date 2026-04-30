import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sto_cart')) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('sto_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1) => {
    const pid = product._id || product.id;
    setItems(prev => {
      const existing = prev.find(i => (i._id || i.id) === pid);
      if (existing) {
        return prev.map(i => (i._id || i.id) === pid ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, id: pid, qty }];
    });
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(i => (i._id || i.id) !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setItems(prev => prev.map(i => (i._id || i.id) === id ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
