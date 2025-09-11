import React, { useState, useEffect, useRef } from "react";
import { api } from "../Instance/api";
import {
  Trash2,
  Loader,
  CreditCard,
  HandCoins,
  Search,
  X,
  Download,
  ShoppingCart
} from "lucide-react";
import toast from "react-hot-toast";
import { pdf } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

function SaleForm({ onSaleAdded }) {
  const [paymentType, setPaymentType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [downloadInvoice, setDownloadInvoice] = useState(false);
  const [completedSale, setCompletedSale] = useState(null);

  // Calculate total amount
  const totalAmount = items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  // Debounce search function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchProducts(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = async (query) => {
    try {
      setSearchLoading(true);
      const res = await api.get(`admin/products?search=${query}`);
      setSearchResults(res.data.data);
    } catch (error) {
      console.error("Error searching products", error);
      toast.error("Failed to search products");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    const existingItemIndex = items.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      setItems(updatedItems);
    } else {
      setItems([...items, {
        productId: product.id,
        product: product,
        quantity: 1
      }]);
    }
    
    // Reset search
    setSearchQuery("");
    setSearchResults([]);
  };

  const downloadPdf = async (saleData) => {
    try {
      // Create PDF blob
      const blob = await pdf(<InvoiceTemplate sale={saleData} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${saleData.id}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Please add at least one product");
      return;
    }
    
    setLoading(true);
    try {
      const saleData = {
        paymentType,
        customerName,
        customerEmail,
        customerPhone,
        items: items.map((item) => ({
          productId: parseInt(item.productId, 10),
          quantity: parseInt(item.quantity, 10),
        })),
      };
      const response = await api.post("/sales/add-sale", saleData);
      const completedSaleData = response.data.data;
      
      // If download invoice was selected, download the PDF
      if (downloadInvoice) {
        await downloadPdf(completedSaleData);
      }
      
      onSaleAdded();
      
      // Reset form
      setPaymentType("");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setItems([]);
      setDownloadInvoice(false);
    } catch (error) {
      toast.error("Failed to complete sale");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const updateQuantity = (index, value) => {
    const updated = [...items];
    const quantity = parseInt(value, 10) || 1;
    if (quantity < 1) return;
    updated[index].quantity = quantity;
    setItems(updated);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Sale Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C3333]">Customer Name</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C3333]">Customer Email</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C3333]">Customer Phone</label>
            <input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
            />
          </div>

          <div className="space-y-2 ">
            <label className="block text-sm font-medium text-[#1C3333]">Payment Type</label>
            <div className="relative">
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full px-3 py-2 border cursor-pointer border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white appearance-none"
                required
              >
                <option value="">Payment type</option>
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {paymentType === "CARD" ? (
                  <CreditCard className="h-5 w-5 text-[#1C3333]/70" />
                ) : paymentType === "CASH" ? (
                  <HandCoins className="h-5 w-5 text-[#1C3333]/70" />
                ) : (
                  <span className="text-[#1C3333]/70">⌄</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1C3333]/20 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#1C3333]">Add Products</h3>
          </div>

          {/* Product Search Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1C3333]">Search Products</label>
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#1C3333]/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-[#1C3333]/50 hover:text-[#1C3333]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none sm:text-sm">
                  {searchLoading ? (
                    <div className="px-4 py-2 text-[#1C3333]/70 flex items-center">
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      Searching...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="px-4 py-2 text-[#1C3333]/70">No products found</div>
                  ) : (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="cursor-pointer hover:bg-[#F4F9F9] px-4 py-2 flex justify-between text-[#1C3333]"
                        onClick={() => handleProductSelect(product)}
                      >
                        <span>{product.name}</span>
                        <span className="text-[#1C3333]/70">Rs.{product.price.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download Invoice Checkbox */}
        {items.length > 0 && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="downloadInvoice"
              checked={downloadInvoice}
              onChange={(e) => setDownloadInvoice(e.target.checked)}
              className="h-4 w-4 text-[#1C3333] focus:ring-[#1C3333] border-[#1C3333]/30 rounded"
            />
            <label htmlFor="downloadInvoice" className="ml-2 block text-sm text-[#1C3333] flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Download invoice after sale
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1C3333] hover:bg-[#1C3333]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C3333] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2 h-4 w-4" />
              Processing...
            </>
          ) : (
            "Complete Sale"
          )}
        </button>
      </form>

      {/* Cart Section */}
      <div className="md:w-96 bg-[#F4F9F9] rounded-lg p-4 h-fit">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#1C3333] flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart ({items.length})
          </h3>
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => setItems([])}
              className="text-sm text-red-500 hover:text-red-700 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-[#1C3333]/70">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Your cart is empty</p>
            <p className="text-sm">Search and add products to the cart</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm">
                <div className="flex-1">
                  <p className="text-[#1C3333] font-medium">{item.product.name}</p>
                  <p className="text-[#1C3333]/70 text-sm">Rs.{item.product.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-20">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, e.target.value)}
                      className="w-full px-2 py-1 border border-[#1C3333]/30 rounded-md text-[#1C3333] bg-white text-center"
                    />
                  </div>
                  
                  <p className="w-20 text-right font-medium text-[#1C3333]">
                    Rs.{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-1 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="border-t border-[#1C3333]/20 pt-3 mt-3">
              <div className="flex justify-between items-center font-medium text-[#1C3333]">
                <span>Total:</span>
                <span>Rs.{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SaleForm;