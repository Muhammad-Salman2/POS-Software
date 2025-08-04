import React, { useState, useEffect } from "react";

export default function Member() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // 1. Load from localStorage once component mounts
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // 2. Save products to localStorage when they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing product
      const updated = [...products];
      updated[editIndex] = formData;
      setProducts(updated);
      setEditIndex(null);
    } else {
      // Add new product
      setProducts((prev) => [...prev, formData]);
    }

    setFormData({
      fullname: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);

    // Agar jo item edit ho raha tha wo delete hua to edit mode clear kar do
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <>
      <div className="max-w-[400px] mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editIndex !== null ? "Edit Cashiar" : "Add Cashiar"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="p w-full px-4 py-2 border rounded-md"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p w-full px-4 py-2 border rounded-md"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p w-full px-4 py-2 border rounded-md"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="cashiar">Cashiar</option>
            </select>
          </div>
          <button
            type="submit"
            className="justify-center flex w-[100px] bg-[#155dfc] font-bold !text-white py-2 rounded-md hover:bg-blue-700 mt-5 ml-auto transition-colors duration-200"
          >
            {editIndex !== null ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-x-auto border-black w-[800px] flex !justify-center ml-auto mr-auto">
        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No products added yet.</p>
        ) : (
          <table className="min-w-full text-left border-collapse border border-gray-300 rounded-lg shadow-lg bg-white">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-6 py-3 border border-gray-300">#</th>
                <th className="px-6 py-3 border border-gray-300">Name</th>
                <th className="px-6 py-3 border border-gray-300">Email</th>
                <th className="px-6 py-3 border border-gray-300">Role</th>
                <th className="px-6 py-3 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.fullname}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.email}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.role}</td>
                  <td className="px-6 py-3 border border-gray-300 text-center gap-1 flex justify-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="inline-block px-4 py-1 rounded-2xl bg-[#155dfc] !text-white font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="inline-block px-4 py-1 rounded-2xl bg-[#155dfc] !text-white font-semibold transition"
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
    </>
  );
}
