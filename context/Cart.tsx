'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/api/api';

interface CartContextValue {
    cart: Product[];
    addItem: (product: Product) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [cart, setCart] = useState<Product[]>([])

    const addItem = (product: Product) => {
        setCart((prev) => [...prev, product]);
    };

    return (
        <CartContext.Provider value={{ cart, addItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
