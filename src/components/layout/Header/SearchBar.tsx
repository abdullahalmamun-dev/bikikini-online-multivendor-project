'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    if (query.length >= 3) {
      const mockSuggestions = [
        `${query} products`,
        `${query} deals`,
        `Best ${query} 2024`
      ]
      setSuggestions(mockSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
      <div className="flex items-center bg-white rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, brands, and categories"
          className="flex-1 px-6 py-3 text-green-800 focus:outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-primary hover:bg-primary-dark transition-colors"
        >
          <FiSearch className="h-5 w-5 text-green-800" />
        </button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg mt-1 rounded-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-6 py-3 text-green-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setQuery(suggestion)
                router.push(`/search?q=${encodeURIComponent(suggestion)}`)
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </form>
  )
}
