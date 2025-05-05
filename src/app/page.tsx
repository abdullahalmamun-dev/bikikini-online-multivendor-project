"use client"
import Header from "@/components/layout/Header/Header";
import CategoriesMenu from "@/components/layout/Navigation/CategoriesMenu";
import HeroBanner from "@/components/home/HeroBanner/HeroBanner";
import { useState } from "react";

export default function Home() {
    const [showCategories, setShowCategories] = useState(false)
    
  const heroSlides = [
    {
      id: '1',
      title: 'Summer Collection Sale',
      description: 'Up to 50% off on selected items',
      buttonText: 'Shop Now',
      buttonLink: '/summer-sale',
      imageUrl: 'https://i.ibb.co.com/gLZH2sYt/Summer-Sale.jpg',
      backgroundColor: 'bg-blue-600'
    },
    {
      id: '2',
      title: 'New Tech Gadgets',
      description: 'Latest electronics and accessories',
      buttonText: 'Explore',
      buttonLink: '/electronics',
      imageUrl: 'https://i.ibb.co.com/wNwZKrgw/tech-gadgets.jpg',
      backgroundColor: 'bg-gray-800'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CategoriesMenu onClose={() => setShowCategories(!showCategories)} />
      
      <main className="flex-1">
        <HeroBanner slides={heroSlides} />
        
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          {/* Product grid will be added here */}
        </section>
      </main>
    </div>
  );
}
