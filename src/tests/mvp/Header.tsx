/* eslint-disable react/no-unescaped-entities */
import { type ReactElement } from 'react'
import logo from '../../../public/greenfield.svg'

export default function Header (): ReactElement {
  return (
    <header className="border-b">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-2 px-4 bg-gray-100">
        <div className="flex items-center space-x-2 text-sm">
          <span>Friday, July 12, 2024</span>
          <span>|</span>
          <span>Today's Paper</span>
        </div>
        <div className="text-sm">
          <span>S&P 500 +0.55%</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center py-4 px-4">
        {/* Left Links */}
        <nav className="flex space-x-4 text-sm">
          <a href="#" className="hover:underline">U.S.</a>
          <a href="#" className="hover:underline">INTERNATIONAL</a>
          <a href="#" className="hover:underline">CANADA</a>
          <a href="#" className="hover:underline">ESPAÑOL</a>
          <a href="#" className="hover:underline">中文</a>
        </nav>

        {/* Logo */}
        <div className="flex-grow flex justify-center">
          <img src={logo} alt="Greenfield Times" className="h-10" />
        </div>

        {/* Right Links */}
        <div className="flex space-x-4 items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">SUBSCRIBE FOR $0.25/WEEK</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">LOG IN</button>
        </div>
      </div>

      {/* Sub Menu */}
      <div className="flex justify-center py-2 px-4 border-t">
        <nav className="flex space-x-4 text-sm">
          <a href="#" className="hover:underline">U.S.</a>
          <a href="#" className="hover:underline">World</a>
          <a href="#" className="hover:underline">Business</a>
          <a href="#" className="hover:underline">Arts</a>
          <a href="#" className="hover:underline">Lifestyle</a>
          <a href="#" className="hover:underline">Opinion</a>
          <a href="#" className="hover:underline">Audio</a>
          <a href="#" className="hover:underline">Games</a>
          <a href="#" className="hover:underline">Cooking</a>
          <a href="#" className="hover:underline">Wirecutter</a>
          <a href="#" className="hover:underline">The Athletic</a>
        </nav>
      </div>
    </header>
  )
}
