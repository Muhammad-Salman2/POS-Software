import React from 'react';
import { CurrencyDollarIcon, ShoppingCartIcon, ClockIcon } from '@heroicons/react/24/solid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4000 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 7000 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4 p-6 bg-[#155dfc] text-white rounded-xl shadow-lg transform transition hover:scale-105">
          <CurrencyDollarIcon className="w-12 h-12" />
          <div>
            <p className="text-lg font-semibold">Total Sales</p>
            <p className="text-2xl font-bold">$12,000</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-6 bg-[#155dfc] text-white rounded-xl shadow-lg transform transition hover:scale-105">
          <ShoppingCartIcon className="w-12 h-12" />
          <div>
            <p className="text-lg font-semibold">Products Sold</p>
            <p className="text-2xl font-bold">300</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-6 bg-[#155dfc] text-white rounded-xl shadow-lg transform transition hover:scale-105">
          <ClockIcon className="w-12 h-12" />
          <div>
            <p className="text-lg font-semibold">Recent Activity</p>
            <p className="text-2xl font-bold">5 New Orders</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
