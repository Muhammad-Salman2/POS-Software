// File: src/pages/Inventory.jsx
import React from 'react';

const stock = [
  { name: 'Item A', quantity: 50, status: 'In Stock' },
  { name: 'Item B', quantity: 5, status: 'Low Stock' },
];

export default function Inventory() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">
                {/* Status with colored badge */}
                <span
                  className={`
                    px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === 'Low Stock'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }
                  `}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
