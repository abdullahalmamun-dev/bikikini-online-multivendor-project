'use client'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import Link from 'next/link'

export default function UserMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 hover:text-primary">
        <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center border">
          <FiUser className="w-4 h-4" />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white text-green-900 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/account"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 px-4 py-2 text-sm rounded-md`}
                >
                  <FiUser className="w-4 h-4" />
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 px-4 py-2 text-sm rounded-md`}
                  >
                  <FiSettings className="w-4 h-4" />
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md`}
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
