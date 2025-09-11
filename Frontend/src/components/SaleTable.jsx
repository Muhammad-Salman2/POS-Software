import React, { useContext, useEffect, useState, useCallback } from "react";
import { api } from "../Instance/api";
import { Loader, AlertCircle, ChevronLeft, ChevronRight, Filter, X, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import ConfirmModal from "./ConfirmModal";

// Import the separated components
import SalesRow from "./SaleRow";
import SaleDetailsSheet from "./SaleDetailsSheet";
import FilterInput from "./FilterInput";

export default function SalesTable({ refresh }) {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0
  });

  // Filter states
  const [filters, setFilters] = useState({
    q: "", 
    startDate: "",
    endDate: "",
    customerName: "",
    paymentType: "",
    category: ""
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sheet state
  const [selectedSale, setSelectedSale] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  const fetchSales = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          queryParams.append(key, value);
        }
      });

      const res = await api.get(`/sales?${queryParams.toString()}`);
      setSales(res.data.data);
      
      setPagination(prev => ({
        ...prev,
        totalPages: res.data.meta?.totalPages || 1,
        totalItems: res.data.meta?.totalItems || res.data.data.length
      }));
    } catch (error) {
      console.error("Error fetching sales", error);
      setError("Failed to load sales data");
      toast.error("Failed to load sales data");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      q: "",
      startDate: "",
      endDate: "",
      customerName: "",
      paymentType: "",
      category: ""
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const hasActiveFilters = Object.values(filters).some(value => value && value.trim() !== '');

  const handleDeleteClick = useCallback((id) => {
    setSaleToDelete(id);
    setConfirmOpen(true);
  }, []);

  const handleViewDetails = useCallback((sale) => {
    setSelectedSale(sale);
    setSheetOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await api.delete(`/sales/delete-sale/${saleToDelete}`);
      toast.success("Sale deleted successfully");
      
      // Update local state optimistically
      setSales(prev => prev.filter(sale => sale.id !== saleToDelete));
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems - 1
      }));
      
      setConfirmOpen(false);
      setSaleToDelete(null);
      
      if (sales.length === 1 && pagination.page > 1) {
        setPagination(prev => ({ ...prev, page: prev.page - 1 }));
      }
      
      // Force refresh after delete
      setTimeout(() => fetchSales(), 100);
    } catch (error) {
      toast.error("Failed to delete sale");
      console.error("Error deleting sale", error);
      setConfirmOpen(false);
      setSaleToDelete(null);
    }
  }, [saleToDelete, sales.length, pagination.page, fetchSales]);

  const cancelDelete = useCallback(() => {
    setConfirmOpen(false);
    setSaleToDelete(null);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  }, [pagination.totalPages]);

  const handleLimitChange = useCallback((e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
  }, []);

  // Debounce effect for filters
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSales();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchSales, refresh]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-10 w-10 text-[#1C3333]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[#1C3333]">
        <AlertCircle className="h-12 w-12 mb-4 text-[#FF6F61]" />
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={fetchSales}
          className="mt-4 px-4 py-2 bg-[#1C3333] text-white rounded-md hover:bg-[#1C3333]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C3333] cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-[#1C3333]/20 overflow-hidden">
        {/* Top pagination info and per page selector */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-[#1C3333]/20 bg-[#F4F9F9]">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#1C3333]">
              Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.totalItems)}
              </span>{" "}
              of <span className="font-medium">{pagination.totalItems}</span> results
            </span>
            <select
              value={pagination.limit}
              onChange={handleLimitChange}
              className="text-sm border-[#1C3333]/30 rounded-md focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] cursor-pointer"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="px-4 py-3 border-b border-[#1C3333]/20 bg-[#F4F9F9]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#1C3333] border border-[#1C3333]/30 rounded-md hover:bg-[#1C3333]/10 cursor-pointer"
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-[#1C3333] text-white text-xs px-2 py-0.5 rounded-full">
                    {Object.values(filters).filter(v => v && v.trim() !== '').length}
                  </span>
                )}
              </button>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#FF6F61] hover:bg-[#FF6F61]/10 rounded-md cursor-pointer"
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white rounded-md border border-[#1C3333]/20">
              {/* Product Name Filter */}
              <FilterInput
                label="Product Name"
                value={filters.q}
                onChange={(value) => handleFilterChange('q', value)}
                placeholder="Search by product name..."
              />

              {/* Customer Name Filter */}
              <FilterInput
                label="Customer Name"
                value={filters.customerName}
                onChange={(value) => handleFilterChange('customerName', value)}
                placeholder="Search by customer name..."
              />

              {/* Payment Type Filter */}
              <FilterInput
                label="Payment Type"
                value={filters.paymentType}
                onChange={(value) => handleFilterChange('paymentType', value)}
                type="select"
                options={[
                  { value: "", label: "All Payment Types" },
                  { value: "CASH", label: "Cash" },
                  { value: "CARD", label: "Card" }
                ]}
              />

              {/* Start Date Filter */}
              <FilterInput
                label="From Date"
                value={filters.startDate}
                onChange={(value) => handleFilterChange('startDate', value)}
                type="date"
              />

              {/* End Date Filter */}
              <FilterInput
                label="To Date"
                value={filters.endDate}
                onChange={(value) => handleFilterChange('endDate', value)}
                type="date"
              />

              {/* Category Filter */}
              <FilterInput
                label="Product Category"
                value={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
                placeholder="Search by category..."
              />
            </div>
          )}
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#1C3333]/20">
            <thead className="bg-[#F4F9F9]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#1C3333] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#1C3333] uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#1C3333] uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#1C3333] uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#1C3333] uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#1C3333] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#1C3333]/20">
              {sales.map((sale) => (
                <SalesRow
                  key={sale.id}
                  sale={sale}
                  user={user}
                  onDelete={handleDeleteClick}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {sales.length === 0 && !loading && (
          <div className="text-center py-10">
            <div className="bg-[#1C3333]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="h-6 w-6 text-[#1C3333]" />
            </div>
            <h3 className="text-base font-medium text-[#1C3333]">
              {hasActiveFilters ? "No sales found" : "No sales yet"}
            </h3>
            <p className="text-[#1C3333]/70 text-sm">
              {hasActiveFilters ? "Try adjusting your filters" : "Create your first sale"}
            </p>
          </div>
        )}

        {/* Bottom pagination navigation */}
        {sales.length > 0 && (
          <div className="px-4 py-3 flex justify-center space-x-2 border-t border-[#1C3333]/20 bg-[#F4F9F9]">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 border border-[#1C3333]/30 rounded-md text-sm font-medium text-[#1C3333] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1C3333]/10 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
                      pagination.page === pageNum
                        ? "bg-[#1C3333] text-white"
                        : "border border-[#1C3333]/30 hover:bg-[#1C3333]/10 text-[#1C3333]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
                <span className="px-2 text-[#1C3333]">...</span>
              )}
              {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
                    pagination.page === pagination.totalPages
                      ? "bg-[#1C3333] text-white"
                      : "border border-[#1C3333]/30 hover:bg-[#1C3333]/10 text-[#1C3333]"
                  }`}
                >
                  {pagination.totalPages}
                </button>
              )}
            </div>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 border border-[#1C3333]/30 rounded-md text-sm font-medium text-[#1C3333] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1C3333]/10 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Sale Details Sheet */}
      <SaleDetailsSheet 
        sale={selectedSale} 
        open={sheetOpen} 
        onOpenChange={setSheetOpen}
        onDelete={handleDeleteClick}
        user={user}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Sale"
        message="Are you sure you want to delete this sale? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}