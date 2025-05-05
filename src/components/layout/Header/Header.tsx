'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import CategoriesMenu from '../Navigation/CategoriesMenu'
import logo from '../../../logo.png'

export default function Header() {
  const [isLoggedIn] = useState(true)
  const [cartItemsCount] = useState(3)
  const [showCategories, setShowCategories] = useState(false)

  return (
    <header className="py-2 sticky top-0 z-50 bg-green-700 shadow-md">
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Bikikinionline"
                width={100}
                height={80}
              />
              <span className="text-xl font-bold text-primary">Bikikini Online</span>
            </Link>

            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link href="/wishlist" className="p-2 hover:text-primary">
                    <FiHeart className="h-6 w-6" />
                  </Link>
                  <Link href="/cart" className="relative p-2 hover:text-primary">
                    <FiShoppingCart className="h-6 w-6" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <UserMenu />
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="px-4 py-2 hover:text-primary">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12 gap-6 overflow-x-auto">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-1 font-medium hover:text-primary"
            >
              All Categories
              <svg
                className={`w-4 h-4 transition-transform ${
                  showCategories ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Link href="/deals" className="hover:text-primary">
              Today&apos;s Deals
            </Link>
            <Link href="/new" className="hover:text-primary">
              New Arrivals
            </Link>
            <Link href="/brands" className="hover:text-primary">
              Brands
            </Link>
          </div>
        </div>
      </nav>

      {showCategories && (
        <CategoriesMenu onClose={() => setShowCategories(false)} />
      )}      
    </header>
  )
}
