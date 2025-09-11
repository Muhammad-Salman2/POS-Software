import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { CreditCard, Trash2, Loader } from 'lucide-react';
import InvoiceDownloadButton from './InvoiceDownloadButton';

const SaleDetailsSheet = ({ sale, open, onOpenChange, onDelete, user }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!sale) return null;

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await onDelete(sale.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting sale", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-[#F4F9F9] overflow-y-auto p-4">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1C3333] text-white">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold text-[#1C3333]">
                Sale Details
              </SheetTitle>
              <SheetDescription className="text-[#1C3333]/70">
                Sale #{sale.id}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Sale Information */}
          <div className="bg-white p-4 rounded-md border border-[#1C3333]/20">
            <h3 className="text-sm font-medium text-[#1C3333] mb-3">SALE INFORMATION</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#1C3333]/70">Date</p>
                <p className="text-[#1C3333] font-medium">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-[#1C3333]/70">Time</p>
                <p className="text-[#1C3333] font-medium">
                  {new Date(sale.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-[#1C3333]/70">Payment Type</p>
                <p className="text-[#1C3333] font-medium">{sale.paymentType}</p>
              </div>
              <div>
                <p className="text-[#1C3333]/70">Total Amount</p>
                <p className="text-[#1C3333] font-medium">Rs.{sale.totalAmount?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          {(sale.customerName || sale.customerEmail || sale.customerPhone) && (
            <div className="bg-white p-4 rounded-md border border-[#1C3333]/20">
              <h3 className="text-sm font-medium text-[#1C3333] mb-3">CUSTOMER INFORMATION</h3>
              
              <div className="space-y-2 text-sm">
                {sale.customerName && (
                  <div>
                    <p className="text-[#1C3333]/70">Name</p>
                    <p className="text-[#1C3333] font-medium">{sale.customerName}</p>
                  </div>
                )}
                {sale.customerEmail && (
                  <div>
                    <p className="text-[#1C3333]/70">Email</p>
                    <p className="text-[#1C3333] font-medium">{sale.customerEmail}</p>
                  </div>
                )}
                {sale.customerPhone && (
                  <div>
                    <p className="text-[#1C3333]/70">Phone</p>
                    <p className="text-[#1C3333] font-medium">{sale.customerPhone}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="bg-white p-4 rounded-md border border-[#1C3333]/20">
            <h3 className="text-sm font-medium text-[#1C3333] mb-3">ITEMS ({sale.saleItems?.length || 0})</h3>
            
            <div className="space-y-3">
              {sale.saleItems?.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 border-b border-[#1C3333]/10 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-[#1C3333]">{item.product?.name || "Unknown Product"}</p>
                    <p className="text-xs text-[#1C3333]/70">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-[#1C3333]">
                    Rs.{(item.product?.price * item.quantity)?.toFixed(2) || "0.00"}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-[#1C3333]/20">
              <div className="flex justify-between items-center text-sm font-medium text-[#1C3333]">
                <span>Total</span>
                <span>Rs.{sale.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-4 rounded-md border border-[#1C3333]/20">
            <h3 className="text-sm font-medium text-[#1C3333] mb-3">ACTIONS</h3>
            <div className="space-y-2">
              <InvoiceDownloadButton sale={sale} />
              {user && user.role === "admin" && (
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#ff6052] hover:bg-[#FF6F61]/10 rounded-md cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Delete Sale
                </button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SaleDetailsSheet;