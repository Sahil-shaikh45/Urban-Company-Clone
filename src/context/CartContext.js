import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('urban_easy_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // Global Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authRole, setAuthRole] = useState('USER'); // 'USER' or 'PROVIDER'

  const openLogin = () => {
    setAuthMode('login');
    setAuthRole('USER');
    setShowAuthModal(true);
  };

  const openRegister = (role = 'USER') => {
    setAuthMode('register');
    setAuthRole(role);
    setShowAuthModal(true);
  };

  const addToCart = (service) => {
    setCart((prev) => [...prev, service]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('urban_easy_user', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('urban_easy_user');
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, clearCart,
      searchQuery, setSearchQuery,
      selectedCategory, setSelectedCategory,
      user, isLoggedIn, login, logout,
      showAuthModal, setShowAuthModal,
      authMode, setAuthMode,
      authRole, setAuthRole,
      openLogin, openRegister
    }}>
      {children}
    </CartContext.Provider>
  );
};
