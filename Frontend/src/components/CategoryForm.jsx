import React, { useState } from "react";
import { api } from "../Instance/api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function CategoryForm({ onCategoryAdded, initialData, onClose }) {
  const [name, setName] = useState(initialData?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const normalizedName = name.trim();
      if (initialData) {
        await api.put(`/admin/categories/update-category/${initialData.id}`, { 
          name: normalizedName 
        });
        toast.success("Category updated successfully!");
      } else {
        const response = await api.post("/admin/categories/add-category", { 
          name: normalizedName 
        });
        toast.success("Category added successfully!");
        if (onCategoryAdded) onCategoryAdded(response.data);
      }
      if (onClose) onClose();
      if (!initialData) setName("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#1C3333]">
          Category Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 cursor-pointer border border-[#1C3333]/30 rounded-md shadow-sm text-sm font-medium text-[#1C3333] bg-white hover:bg-[#F4F9F9]"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 cursor-pointer border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1C3333] hover:bg-[#1C3333]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C3333] disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2 h-4 w-4 inline" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : initialData ? (
            "Update Category"
          ) : (
            "Create Category"
          )}
        </button>
      </div>
    </form>
  );
}