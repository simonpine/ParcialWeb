'use client';

import { createContext, useContext, useState, ReactNode, use } from 'react';
import { Product } from '@/api/api';

interface CartContextValue {
    cart: Product[];
    addItem: (product: Product) => void;
    cantidadItem: number;
    removeItem: (product: Product) => void
    superRemoveItem: (product: Product) => void
    vaciar: any
    valorApagar: any
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [cart, setCart] = useState<any[]>([])

    let cantidadItem = 0
    let valorApagar = 0
    for (let item of cart) {
        cantidadItem += item.cantidad
        valorApagar += item.price * item.cantidad
    }

    const addItem = (product: Product) => {

        setCart((prev) => {
            let encontrado = false
            const newList = []
            for (let item of prev) {

                if (item.id === product.id) {
                    encontrado = true
                    let newItem = { ...item }
                    newItem["cantidad"] += 1
                    newList.push(newItem)
                }
                else {
                    newList.push(item)
                }

            }
            if (encontrado) {
                return newList
            }
            else {
                return [...prev, {
                    ...product,
                    cantidad: 1
                }]
            }

        }
        )




    };

    const removeItem = (product: Product) => {

        setCart((prev) => {
            let encontrado = false
            const newList = []
            for (let item of prev) {

                if (item.id === product.id) {
                    encontrado = true
                    let newItem = { ...item }
                    newItem["cantidad"] -= 1
                    if (newItem["cantidad"] > 0) {
                        newList.push(newItem)
                    }
                }
                else {
                    newList.push(item)
                }

            }
            if (encontrado) {
                return newList
            }
            else {
                return prev
            }

        }
        )
    }

    const vaciar = () => {
        setCart([])
    }

    const superRemoveItem = (product: Product) => {

        setCart((prev) => {
            let encontrado = false
            const newList = []
            for (let item of prev) {

                if (item.id !== product.id) {
                    newList.push(item)
                }
                if (item.id == product.id) {
                    encontrado = true
                }

            }
            if (encontrado) {

                return newList
            }
            else {
                return prev
            }

        }
        )
    }
    return (
        <CartContext.Provider value={{ cart, addItem, cantidadItem, removeItem, superRemoveItem, vaciar, valorApagar }}>
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
