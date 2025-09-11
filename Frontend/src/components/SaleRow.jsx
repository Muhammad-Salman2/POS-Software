import React from 'react';
import { Trash2, CreditCard, HandCoins, Eye } from 'lucide-react';

const SalesRow = React.memo(({ sale, user, onDelete, onViewDetails }) => {
  return (
    <tr className="hover:bg-[#F4F9F9]">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#1C3333]">
          {new Date(sale.createdAt).toLocaleDateString()}
        </div>
        <div className="text-xs text-[#1C3333]/70">
          {new Date(sale.createdAt).toLocaleTimeString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <p className="text-sm font-medium text-[#1C3333]">{sale.customerName || "Walk-in"}</p>
          {sale.customerEmail && (
            <p className="text-xs text-[#1C3333]/70">{sale.customerEmail}</p>
          )}
          {sale.customerPhone && (
            <p className="text-xs text-[#1C3333]/70">{sale.customerPhone}</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1C3333]">
        Rs.{sale.totalAmount?.toFixed(2) || "0.00"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {sale.paymentType === "CARD" ? (
            <CreditCard className="h-4 w-4 text-[#1C3333]" />
          ) : (
            <HandCoins className="h-4 w-4 text-[#1C3333]" />
          )}
          <span className="text-sm text-[#1C3333]">{sale.paymentType}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1C3333]">
        {sale.saleItems?.length || 0} item(s)
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onViewDetails(sale)}
            className="p-2 text-[#1C3333] hover:text-[#1C3333]/80 hover:bg-[#1C3333]/10 rounded-md cursor-pointer"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </button>
          
          {user?.role === "admin" && (
            <button
              onClick={() => onDelete(sale.id)}
              className="p-2 text-[#FF6F61] hover:text-[#FF6F61]/80 hover:bg-[#FF6F61]/10 rounded-md cursor-pointer"
              title="Delete sale"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
});

SalesRow.displayName = 'SalesRow';
export default SalesRow;