import React, { useState, useEffect } from 'react';

export default function Product() {
  const categories = ['Electronics', 'Furniture', 'Accessories', 'Fashion'];
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // localStorage se data load karo initial state ke liye
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    costPrice: '',
    stockQuantity: '',
    unit: '',
    categoryIndex: '',
    categoryName: '',
  });

  // Jab products update ho to localStorage me save karo
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoryIndex') {
      const index = parseInt(value);
      setFormData({
        ...formData,
        categoryIndex: index,
        categoryName: categories[index],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = formData;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, formData]);
    }
    setFormData({
      name: '',
      price: '',
      costPrice: '',
      stockQuantity: '',
      unit: '',
      categoryIndex: '',
      categoryName: '',
    });
    setIsOpen(false);
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Add Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setEditIndex(null);
          setFormData({
            name: '',
            price: '',
            costPrice: '',
            stockQuantity: '',
            unit: '',
            categoryIndex: '',
            categoryName: '',
          });
        }}
        className="mb-6 bg-gradient-to-r bg-blue-600 text-white px-7 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      >
        + Add New Product
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6">{editIndex !== null ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inputs */}
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                placeholder="Cost Price"
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="Stock Quantity"
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unit (e.g. kg, pcs)"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              {/* Category Dropdown */}
              <select
                name="categoryIndex"
                value={formData.categoryIndex}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={index}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setEditIndex(null);
                  }}
                  className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  {editIndex !== null ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mt-8 overflow-x-auto">
        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No products added yet.</p>
        ) : (
          <table className="min-w-full text-left border-collapse border border-gray-300 rounded-lg shadow-lg bg-white">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-6 py-3 border border-gray-300">#</th>
                <th className="px-6 py-3 border border-gray-300">Name</th>
                <th className="px-6 py-3 border border-gray-300">Category</th>
                <th className="px-6 py-3 border border-gray-300">Price</th>
                <th className="px-6 py-3 border border-gray-300">Cost</th>
                <th className="px-6 py-3 border border-gray-300">Stock</th>
                <th className="px-6 py-3 border border-gray-300">Unit</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.name}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.categoryName}</td>
                  <td className="px-6 py-3 border border-gray-300">Rs. {p.price}</td>
                  <td className="px-6 py-3 border border-gray-300">Rs. {p.costPrice}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.stockQuantity}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.unit}</td>
                  <td className="px-6 py-3 border border-gray-300 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="inline-block px-4 py-1 rounded-lg bg-yellow-400 text-white text-sm font-medium hover:bg-yellow-500 transition"
                      aria-label={`Edit product ${p.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="inline-block px-4 py-1 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                      aria-label={`Delete product ${p.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
