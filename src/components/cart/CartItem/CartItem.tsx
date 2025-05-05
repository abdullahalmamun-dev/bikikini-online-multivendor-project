// src/components/cart/CartItem/CartItem.tsx
"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiHeart } from 'react-icons/fi';

type CartItemProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  vendorName: string;
  vendorId: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onMoveToWishlist: (id: string) => void;
};

const CartItem = ({
  id,
  title,
  image,
  price,
  quantity,
  maxQuantity,
  vendorName,
  vendorId,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
}: CartItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      onUpdateQuantity(id, newQuantity);
    }
  };
  
  return (
    <div 
      className="flex py-4 border-b border-gray-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Product image */}
      <div className="w-24 h-24 flex-shrink-0 relative mr-4">
        <Link href={`/product/${id}`}>
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-contain" 
          />
        </Link>
      </div>
      
      {/* Product details */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between">
          <div>
            <Link 
              href={`/product/${id}`} 
              className="text-gray-800 font-medium hover:text-primary line-clamp-2"
            >
              {title}
            </Link>
            <Link 
              href={`/vendor-store/${vendorId}`} 
              className="text-xs text-gray-500 hover:text-primary mt-1"
            >
              Sold by: {vendorName}
            </Link>
          </div>
          
          <div className="text-right">
            <div className="text-primary font-semibold">${(price * quantity).toFixed(2)}</div>
            <div className="text-sm text-gray-500">${price.toFixed(2)} each</div>
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-auto">
          {/* Quantity selector */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button 
              className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-12 px-2 py-1 text-center border-0 focus:outline-none"
            />
            <button 
              className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity}
            >
              +
            </button>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            <button 
              className="text-gray-500 hover:text-blue-500"
              onClick={() => onMoveToWishlist(id)}
              title="Move to wishlist"
            >
              <FiHeart className="h-5 w-5" />
            </button>
            <button 
              className="text-gray-500 hover:text-red-500"
              onClick={() => onRemove(id)}
              title="Remove from cart"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
