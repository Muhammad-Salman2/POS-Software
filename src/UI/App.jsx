// File: src/App.jsx
// import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Slidebaar';

import Invoice from '../pages/Invoice';
import Inventory from '../pages/Inventory';
import Product from '../pages/Product';
import Analyst from '../pages/Analyst';
import Dashboard from '../pages/dashboard';
import Catogary from '../pages/Catagory';
// import RegisterUserForm from '../components/login_signup';

// import Signup from '../components/Signup';
import Login from '../components/Login';
import { useState, useEffect } from 'react';
import RegisterUserForm from '../components/login_signup';

import Member from '../pages/Member';

function App() {
  const [isAdminRegistered, setIsAdminRegistered] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    // isAdminRegistered ? 
    <>
        <Router>
          <div className="flex min-h-screen">
            <div className="flex-1 p-4 bg-gray-50 overflow-auto">
              {/* {isAdminLoggedIn ?   */}
                <>
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/invoice" element={<Invoice />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/analyst" element={<Analyst />} />
                    <Route path="/catogary" element={<Catogary />} />
                    <Route path="/member" element={<Member />} />
                  </Routes>
                </> 
                {/* :
            
                 <Login />
              } */}
            </div>
          </div>
        </Router>
      </>
    // : 
    // <RegisterUserForm />
    // <RegisterUserForm onRegister={() => setIsAdminRegistered(true)} />
    // <RegisterUserForm setIsAdminRegistered = {true} />
  );
}

export default App;






























// // File: src/App.jsx
// import React, { useEffect, useState } from 'react';
// import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Sidebar from '../components/Slidebaar';
// import Invoice from '../pages/Invoice';
// import Inventory from '../pages/Inventory';
// import Product from '../pages/Product';
// import Analyst from '../pages/Analyst';
// import Dashboard from '../pages/dashboard';
// import Catogary from '../pages/Catogary';
// import Signup from '../components/Signup';
// import Login from '../components/Login';

// function App() {
//   const [isAdminRegistered, setIsAdminRegistered] = useState(false);
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   useEffect(() => {
//     const isRegistered = localStorage.getItem('isAdminRegistered') === 'true';
//     const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

//     setIsAdminRegistered(isRegistered);
//     setIsAdminLoggedIn(isLoggedIn || isRegistered); // ✅ Signup ke baad bhi login treat karo
//   }, []);

//   // ✅ If not registered, show Signup
//   if (!isAdminRegistered) {
//     return (
//       <Router>
//         <Routes>
//           <Route
//             path="*"
//             element={
//               <Signup
//                 setIsAdminRegistered={(val) => {
//                   setIsAdminRegistered(val);
//                   setIsAdminLoggedIn(true); // ✅ Auto-login after signup
//                   localStorage.setItem('isAdminLoggedIn', 'true');
//                 }}
//               />
//             }
//           />
//         </Routes>
//       </Router>
//     );
//   }

//   // ✅ If registered (or logged in), show full app
//   return (
//     <Router>
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1 p-4 bg-gray-50 overflow-auto">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/invoice" element={<Invoice />} />
//             <Route path="/inventory" element={<Inventory />} />
//             <Route path="/product" element={<Product />} />
//             <Route path="/analyst" element={<Analyst />} />
//             <Route path="/catogary" element={<Catogary />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
