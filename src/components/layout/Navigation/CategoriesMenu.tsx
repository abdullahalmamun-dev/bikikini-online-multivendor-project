'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Category = {
  id: string
  name: string
  subcategories: {
    id: string
    name: string
    items: { id: string; name: string }[]
  }[]
}

export default function CategoriesMenu({ onClose }: { onClose: () => void }) {
  const [categories] = useState<Category[]>([
    {
      id: 'electronics',
      name: 'Electronics',
      subcategories: [
        {
          id: 'smartphones',
          name: 'Smartphones',
          items: [
            { id: 'android', name: 'Android Phones' },
            { id: 'iphones', name: 'iPhones' }
          ]
        }
      ]
    }
  ])

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])


  return (
    <div ref={menuRef} className="absolute inset-x-0 top-full bg-green-600 shadow-lg z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1 border-r pr-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  className={`block w-full text-left p-2 rounded-md ${
                    activeCategory === category.id
                      ? 'bg-blue-50 text-primary'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-span-3 pl-6">
            {activeCategory && (
              <div className="grid grid-cols-3 gap-6">
                {categories
                  .find(cat => cat.id === activeCategory)
                  ?.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="space-y-2">
                      <h4 className="font-medium mb-2">{subcategory.name}</h4>
                      <div className="space-y-1">
                        {subcategory.items.map((item) => (
                          <Link
                            key={item.id}
                            href={`/category/${item.id}`}
                            onClick={onClose}
                            className="block text-gray-600 hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
