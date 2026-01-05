'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import type { Product } from '@/data/products';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

export default function AddToCartButton({ product, className = '', size = 'lg' }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);
        setTimeout(() => setIsAdding(false), 2000); // Feedback visual de 2 segundos
    };

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            size={size}
            className={`w-full sm:w-auto gap-2 transition-all duration-300 font-semibold ${isAdding ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'} ${className}`}
        >
            {isAdding ? (
                <>
                    <Check className="w-5 h-5" />
                    <span>¡Agregado!</span>
                </>
            ) : (
                <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Agregar al carrito</span>
                </>
            )}
        </Button>
    );
}
