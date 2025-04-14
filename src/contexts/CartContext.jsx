import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook for using the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load cart from local storage on initial render
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                setItems(parsedCart);
                updateCartStats(parsedCart);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to load cart');
            setLoading(false);
        }
    }, []);

    // Update local storage and cart stats whenever items change
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(items));
            updateCartStats(items);
        } catch (err) {
            setError('Failed to save cart');
        }
    }, [items]);

    // Calculate total items and amount
    const updateCartStats = (cartItems) => {
        const newTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const newTotalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        setTotalItems(newTotalItems);
        setTotalAmount(newTotalAmount);
    };

    // Add item to cart
    const addToCart = (product) => {
        setItems(prevItems => {
            // Check if item already exists in cart
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
            
            if (existingItemIndex > -1) {
                // If item exists, increase quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
                return updatedItems;
            } else {
                // If item is new, add to cart with quantity 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Update quantity of an item
    const updateQuantity = (productId, newQuantity) => {
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === productId 
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setItems([]);
    };

    // Context value
    const contextValue = {
        items,
        totalItems,
        totalAmount,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};