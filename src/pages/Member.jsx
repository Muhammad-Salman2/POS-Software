import React, { useState } from "react";

export default function Member() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: axios.post(...) API call yahan add karein
  };

  return (
    <div className="max-w-[400px] mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Cashiar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="manager">Cashiar</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex place-self: flex-end justify-center w-[100px] bg-[#155dfc] font-bold !text-white py-2 rounded-md hover:bg-blue-700 !mt-5 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
