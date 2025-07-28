
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
    { name: 'Dashboard', path: '/', icon: <RectangleStackIcon className="h-6 w-6" /> },
    { name: 'Invoice', path: '/invoice', icon: <ClipboardDocumentListIcon className="h-6 w-6" /> },
    { name: 'Inventory', path: '/inventory', icon: <CubeIcon className="h-6 w-6" /> },
    { name: 'Analyst', path: '/analyst', icon: <ChartBarIcon className="h-6 w-6" /> },
    { name: 'Product', path: '/product', icon: <ShoppingBagIcon className="h-6 w-6" /> },
    { name: 'Catagory', path: '/catagory', icon: <TagIcon className="h-6 w-6" /> },
    { name: 'Member', path: '/member', },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-black shadow-md transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-20'
          }`}
      >
        <div className="p-4">

          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition text-sm ${location.pathname === item.path
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-gray-200'
                  }`}
                onClick={() => { }}
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
//     { name: 'Dashboard', path: '/', icon: <RectangleStackIcon className="h-6 w-6" /> },
//     { name: 'Invoice', path: '/invoice', icon: <ClipboardDocumentListIcon className="h-6 w-6" /> },
//     { name: 'Inventory', path: '/inventory', icon: <CubeIcon className="h-6 w-6" /> },
//     { name: 'Analyst', path: '/analyst', icon: <ChartBarIcon className="h-6 w-6" /> },
//     { name: 'Product', path: '/product', icon: <ShoppingBagIcon className="h-6 w-6" /> },
//     { name: 'Catogary', path: '/catogary', icon: <TagIcon className="h-6 w-6" /> },
//     { name: 'Member', path: '/member' },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div
//         className={`h-full fixed top-0 left-0 bg-white shadow-md text-black transition-all duration-300 z-40 ${
//           isOpen ? 'w-64' : 'w-20'
//         }`}
//       >
//         <div className="p-4">
//           <nav className="space-y-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition ${
//                   location.pathname === item.path
//                     ? 'bg-blue-600 text-white font-semibold'
//                     : 'hover:bg-gray-200'
//                 }`}
//               >
//                 {item.icon}
//                 <span className={`${isOpen ? 'inline' : 'hidden'} transition-all duration-200`}>
//                   {item.name}
//                 </span>
//               </Link>
//             ))}
//           </nav>
//         </div>
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
//         className={`transition-all duration-300 flex-1 p-6 ${
//           isOpen ? 'ml-64' : 'ml-20'
//         }`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
