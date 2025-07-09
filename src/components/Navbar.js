"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export default function Navbar() {
  const pathname = usePathname();
  const currentCategory = pathname.startsWith('/category/') ? pathname.split('/category/')[1] : '';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 text-black p-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl">
          NewsApp
        </Link>

        {/* Mobile toggle button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d={isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className={`capitalize transition-colors ${
                currentCategory === cat ? "text-[#263b50] font-semibold" : "hover:text-[#263b50]"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isMenuOpen && (
        <div className="flex flex-col mt-2 gap-3 md:hidden">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              onClick={() => setIsMenuOpen(false)}
              className={`capitalize px-4 py-2 ${
                currentCategory === cat ? "text-[#263b50] font-semibold" : "hover:text-[#263b50]"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
