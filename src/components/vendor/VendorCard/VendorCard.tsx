// src/components/vendor/VendorCard/VendorCard.tsx
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

type VendorCardProps = {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  productsCount: number;
  categoryName: string;
  isOfficial?: boolean;
  joinedDate: string;
};

const VendorCard = ({
  id,
  name,
  logo,
  coverImage,
  rating,
  reviewsCount,
  productsCount,
  categoryName,
  isOfficial,
  joinedDate,
}: VendorCardProps) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Cover image */}
      <div className="relative h-32">
        <Image 
          src={coverImage} 
          alt={`${name} cover`} 
          fill 
          className="object-cover"
        />
        {/* Logo overlay */}
        <div className="absolute -bottom-10 left-4 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white">
          <Image 
            src={logo} 
            alt={name} 
            fill 
            className="object-contain p-1"
          />
        </div>
        
        {isOfficial && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Official Store
          </div>
        )}
      </div>
      
      {/* Vendor info */}
      <div className="pt-12 px-4 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/vendor-store/${id}`} className="font-semibold text-lg text-gray-800 hover:text-primary">
              {name}
            </Link>
            <div className="text-sm text-gray-500 mt-1">
              {categoryName} • {productsCount} products
            </div>
          </div>
          
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500 ml-1">({reviewsCount})</span>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          Member since {formatDate(joinedDate)}
        </div>
        
        <Link 
          href={`/vendor-store/${id}`}
          className="mt-4 block w-full py-2 text-center bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
