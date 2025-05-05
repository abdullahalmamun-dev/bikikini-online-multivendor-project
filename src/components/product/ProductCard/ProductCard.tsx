// src/components/product/ProductCard/ProductCard.tsx
"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  vendorName: string;
  vendorId: string;
  isFreeShipping?: boolean;
  onAddToCart: (id: string) => void;
  onAddToWishlist: (id: string) => void;
};

const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  discountPercentage,
  rating,
  reviewsCount,
  image,
  isNew,
  isBestSeller,
  vendorName,
  vendorId,
  isFreeShipping,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <div 
      className="group relative flex flex-col bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {isNew && (
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">New</span>
        )}
        {isBestSeller && (
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">Best Seller</span>
        )}
        {discountPercentage && discountPercentage > 0 && (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">-{discountPercentage}%</span>
        )}
      </div>
      
      {/* Wishlist button */}
      <button
        className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          onAddToWishlist(id);
        }}
      >
        <FiHeart className="h-5 w-5 text-gray-600 hover:text-red-500" />
      </button>
      
      {/* Product image */}
      <Link href={`/product/${id}`} className="relative pt-[100%]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      
      {/* Quick actions on hover - inspired by AliExpress */}
      {isHovering && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2 bg-gradient-to-t from-gray-800/70 to-transparent">
          <button
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            onClick={() => onAddToCart(id)}
            title="Add to cart"
          >
            <FiShoppingCart className="h-5 w-5 text-gray-700" />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            onClick={() => router.push(`/product/${id}`)}
            title="Quick view"
          >
            <FiEye className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      )}
      
      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/vendor-store/${vendorId}`} className="text-xs text-gray-500 hover:text-primary mb-1">
          {vendorName}
        </Link>
        
        <Link href={`/product/${id}`} className="font-medium text-gray-800 line-clamp-2 mb-1 hover:text-primary">
          {title}
        </Link>
        
        <div className="flex items-center mb-1">
          {renderRatingStars(rating)}
          <span className="ml-1 text-xs text-gray-500">({reviewsCount})</span>
        </div>
        
        <div className="flex items-center mt-auto">
          <span className="text-lg font-semibold text-primary">${price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        {isFreeShipping && (
          <span className="text-xs text-green-600 mt-1">Free Shipping</span>
        )}
      </div>
      
      {/* Add to cart button - inspired by Amazon */}
      <button
        className="w-full py-2 bg-primary-light hover:bg-primary text-primary hover:text-white font-medium text-sm transition-colors duration-300"
        onClick={() => onAddToCart(id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
