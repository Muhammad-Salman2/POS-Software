// File: src/pages/Invoice.jsx
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const invoices = [
  { date: '2025-07-25', customer: 'John Doe', amount: '$500' },
  { date: '2025-07-24', customer: 'Jane Smith', amount: '$300' },
];

function InvoiceSlip({ invoice, ref }) {
  return (
    <div ref={ref} className="p-6 w-[350px] bg-white">
      <h2 className="text-xl font-bold mb-2">Invoice Receipt</h2>
      <p><strong>Date:</strong> {invoice.date}</p>
      <p><strong>Customer:</strong> {invoice.customer}</p>
      <p><strong>Amount:</strong> {invoice.amount}</p>
      <hr className="my-2" />
      <p className="text-sm">Thank you for your purchase!</p>
    </div>
  );
}

export default function Invoice() {
  const printRefs = useRef([]);

  const handlePrint = (index) => {
    const print = useReactToPrint({
      content: () => printRefs.current[index],
    });
    print();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <table className="w-full table-auto bg-white shadow rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{inv.date}</td>
              <td className="p-2">{inv.customer}</td>
              <td className="p-2">{inv.amount}</td>
              <td className="p-2 space-x-2">
                <button className="text-blue-500 hover:underline">View</button>
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => handlePrint(i)}
                >
                  Print
                </button>
              </td>
              {/* Hidden printable content */}
              <td className="hidden">
                <div ref={(el) => (printRefs.current[i] = el)}>
                  <InvoiceSlip invoice={inv} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
