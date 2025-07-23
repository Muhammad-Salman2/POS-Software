import React, { useState } from 'react'
import {Link} from "react-router-dom"
import Navbar from './Navbar'
import {
  ClipboardDocumentListIcon,
  ArchiveBoxIcon,
  CubeIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import { ChartBarIcon } from 'lucide-react'


export default function Slidebaar() {
  const [isOpen, setIsOpen] = useState(true);
  return (

    <div>
       {/* <Navbar /> */}






 {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-6 pt-16 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 z-40`}
      >
        <div className="text-2xl font-bold border-b border-gray-700 pb-4 mb-6">
          POS System
        </div>
        <ul className="space-y-4">
          <li>
            <Link
              to="/invoice"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <ClipboardDocumentListIcon className="h-5 w-5" />
              Invoice
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <ArchiveBoxIcon className="h-5 w-5" />
              Inventory
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <CubeIcon className="h-5 w-5" />
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <ChartBarIcon className="h-5 w-5" />
              Analytics
            </Link>
          </li>
        </ul>
      </div>



       
      {/* <h1>you'r at slidebaar page</h1>


      <ul>
        <li><Link to = "/home">Home</Link></li>
        <li><Link to = "/login">Login</Link></li>
      </ul> */}
    </div>
  )
}
