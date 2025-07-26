// // File: src/pages/Analyst.jsx
// import React from 'react';

// export default function Analyst() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Sales Analyst</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white p-4 shadow rounded-xl">
//           <h2 className="text-lg font-semibold mb-2">Sales Trends</h2>
//           <div className="h-56 bg-gray-100 flex items-center justify-center">Trend Graph Placeholder</div>
//         </div>
//         <div className="bg-white p-4 shadow rounded-xl">
//           <h2 className="text-lg font-semibold mb-2">Top Products</h2>
//           <div className="h-56 bg-gray-100 flex items-center justify-center">Bar Chart Placeholder</div>
//         </div>
//         <div className="bg-white p-4 shadow rounded-xl md:col-span-2">
//           <h2 className="text-lg font-semibold mb-2">Profit Overview</h2>
//           <div className="h-56 bg-gray-100 flex items-center justify-center">Profit Line Chart Placeholder</div>
//         </div>
//       </div>
//     </div>
//   );
// }






















// File: src/pages/Analyst.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, Legend
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 400 },
  { month: 'Feb', sales: 600 },
  { month: 'Mar', sales: 800 },
  { month: 'Apr', sales: 700 },
  { month: 'May', sales: 1000 },
  { month: 'Jun', sales: 1200 },
];

const productData = [
  { name: 'Product A', sales: 240 },
  { name: 'Product B', sales: 456 },
  { name: 'Product C', sales: 300 },
  { name: 'Product D', sales: 278 },
];

const profitData = [
  { month: 'Jan', profit: 300 },
  { month: 'Feb', profit: 500 },
  { month: 'Mar', profit: 400 },
  { month: 'Apr', profit: 600 },
  { month: 'May', profit: 700 },
  { month: 'Jun', profit: 900 },
];

export default function Analyst() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Sales Analyst</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Trends - Line Chart */}
        <div className="bg-white p-4 shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📈 Sales Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products - Bar Chart */}
        <div className="bg-white p-4 shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🔥 Top Products</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#10b981" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Overview - Area Chart */}
        <div className="bg-white p-4 shadow rounded-2xl md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">💹 Profit Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={profitData}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
