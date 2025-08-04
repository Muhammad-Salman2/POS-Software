// src/pages/CategoryForm.jsx

import axios from "axios";
import { useState, useEffect } from "react";
import BASE_URL from "../constant/CatageryApi";


const Catagery = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  //  Save to localStorage when categories change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddOrUpdate = () => {
    if (categoryName.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...categories];
      updated[editIndex] = categoryName;
      setCategories(updated);
      setEditIndex(null);
    } else {
      setCategories([...categories, categoryName]);
    }

    setCategoryName("");
  };

  const handleEdit = (index) => {
    setCategoryName(categories[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };


  const handelSubmit = async (event) => {
    event.preventDefault();

      try {
        const response = await axios.post(`${BASE_URL}admin/categories/add-category`, categoryName);
        if (response.data.success) {
          setCategories([...categories, categoryName]);
          setCategoryName("");
          setEditIndex(null);

          console.log("Category added successfully:", response.data.message);

        } else {
          console.error("Failed to add category:", response.data.message);

        }

      } catch (error) {
        console.error("Error adding category:", error);
      }
  };

  

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold text-center mb-6">Category Manager</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <button
          onClick={handleAddOrUpdate}
          onClick={handelSubmit}
          className="bg-[#155dfc] !text-white px-6 py-2 rounded-lg transition hover:bg-blue-700"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button> */}
        <button
          onClick={(e) => { handleAddOrUpdate(); handelSubmit(e); }}
          className="bg-[#155dfc] !text-white px-6 py-2 rounded-lg transition hover:bg-blue-700"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">All Categories</h3>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg list-none"
            >
              <span>{cat}</span>
              <div className="space-x-2 ">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-[#155dfc] !text-white hover:underline rounded-lg w-[70px] !mr-1.5 h-7 hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="hover:underline bg-[#155dfc] !text-white rounded-lg w-[70px] h-7 hover:bg-blue-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Catagery;
