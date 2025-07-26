


// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// export default function Slidebaar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const navItems = [
//     // { name: 'Dashboard', path: '/dashboard' },
//     { name: 'Invoice', path: '/invoice' },
//     { name: 'Inventory', path: '/inventory' },
//     { name: 'Analyst', path: '/analyst' },
//     { name: 'Product', path: '/product' },
//      { name: 'Catogary', path: '/catogary' },
//   ];

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white-800 text-black focus:outline-none"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="Toggle Sidebar"
//       >
//         {isOpen ? (
//           <XMarkIcon className="h-6 w-6" />
//         ) : (
//           <Bars3Icon className="h-6 w-6" />
//         )}
//       </button>

//       {/* Sidebar */}
//       <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-6 transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <h2 className="text-2xl font-black mb-6">POS Dashboard</h2>
//         <nav className="space-y-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`block px-4 py-2 rounded-md transition ${
//                 location.pathname === item.path
//                   ? 'bg-blue-600 text-white font-semibold'
//                   : 'hover:bg-gray-700'
//               }`}
//               onClick={() => setIsOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </>



//   );
// }







// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   Bars3Icon,
//   XMarkIcon,
//   RectangleStackIcon,
//   ClipboardDocumentListIcon,
//   CubeIcon,
//   ChartBarIcon,
//   ShoppingBagIcon,
//   TagIcon,
// } from '@heroicons/react/24/outline';

// export default function Slidebaar({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const navItems = [
//     // { name: 'Dashboard', path: '/dashboard', icon: <RectangleStackIcon className="h-5 w-5 mr-2" /> },
//     { name: 'Invoice', path: '/invoice', icon: <ClipboardDocumentListIcon className="h-5 w-5 mr-2" /> },
//     { name: 'Inventory', path: '/inventory', icon: <CubeIcon className="h-5 w-5 mr-2" /> },
//     { name: 'Analyst', path: '/analyst', icon: <ChartBarIcon className="h-5 w-5 mr-2" /> },
//     { name: 'Product', path: '/product', icon: <ShoppingBagIcon className="h-5 w-5 mr-2" /> },
//     { name: 'Catogary', path: '/catogary', icon: <TagIcon className="h-5 w-5 mr-2" /> },
//   ];

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white text-black shadow-md w-64 p-6 transition-transform duration-300 z-40 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <h2 className="text-3xl font-extrabold mb-6 text-black-700">POS Dashboard</h2>
//         <nav className="space-y-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`flex items-center px-4 py-2 rounded-md transition ${
//                 location.pathname === item.path
//                   ? 'bg-blue-600 text-white font-semibold'
//                   : 'hover:bg-gray-200'
//               }`}
//               onClick={() => setIsOpen(false)}
//             >
//               {item.icon}
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Toggle Button */}
//       <button
//         className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-black focus:outline-none"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="Toggle Sidebar"
//       >
//         {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//       </button>

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-300 w-full ${isOpen ? 'ml-64' : 'ml-0'} p-6`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }









import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  RectangleStackIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

export default function Slidebaar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <RectangleStackIcon className="h-6 w-6" /> },
    { name: 'Invoice', path: '/invoice', icon: <ClipboardDocumentListIcon className="h-6 w-6" /> },
    { name: 'Inventory', path: '/inventory', icon: <CubeIcon className="h-6 w-6" /> },
    { name: 'Analyst', path: '/analyst', icon: <ChartBarIcon className="h-6 w-6" /> },
    { name: 'Product', path: '/product', icon: <ShoppingBagIcon className="h-6 w-6" /> },
    { name: 'Catogary', path: '/catogary', icon: <TagIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-black shadow-md transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4">
          <h2 className={`text-xl font-extrabold mb-6 text-black transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            POS Dashboard
          </h2>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition text-sm ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => {}}
              >
                {item.icon}
                <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-black focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 w-full ${isOpen ? 'ml-64' : 'ml-20'} p-6`}
      >
        {children}
      </div>
    </div>
  );
}
