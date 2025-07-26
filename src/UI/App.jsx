// File: src/App.jsx
// import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Slidebaar';

import Invoice from '../pages/Invoice';
import Inventory from '../pages/Inventory';
import Product from '../pages/Product';
import Analyst from '../pages/Analyst';
import Dashboard from '../pages/dashboard';
import Catogary from '../pages/Catogary';
import RegisterUserForm from '../components/login_signup';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <RegisterUserForm />

        <div className="flex-1 p-4 bg-gray-50 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/product" element={<Product />} />
            <Route path="/analyst" element={<Analyst />} />
            <Route path="/catogary" element={<Catogary />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;