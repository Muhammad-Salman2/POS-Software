import { useState } from "react";
import axios from "axios";
import BASE_URL from "../constant/AdminRejisterApi.js";
import Login from "./Login.jsx";
import { useNavigate } from "react-router-dom";

const RegisterUserForm = ({ setIsAdminRegistered, setIsAdminLoggedIn }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await axios.post(`${BASE_URL}user/register`, formData);
      const res_data = await res.data;
      console.log("response from server", res_data);

      setMessage({ type: "success", text: res.data.message });
      setFormData({ fullname: "", email: "", password: "" });

      setTimeout(() => {
        if (setIsAdminRegistered) setIsAdminRegistered();
        if (setIsAdminLoggedIn) setIsAdminLoggedIn();
      }, 500); // Optional delay for UX

    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      setMessage({ type: "error", text: errMsg });
      console.log("Error:", error);
    }

  };

  
    
    const navigate = useNavigate();



  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow flex flex-col items-center justify-center !gap-1">
      <h1 className="text-2xl !font-bold mb-4 ">Admin Registration</h1>
      {message && (
        <p
          className={`mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
        >
          {message.text}
        </p>
      )}
 


      <form onSubmit={handleSubmit} className="w-full space-y-4 ">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded !mt-6"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded !mt-6"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded !mt-6"
        />

        <p className="text-center mt-4">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer underline mt-1.5">
            Login
          </span>
        </p>


        <button
          type="submit"
          className="w-full font-bold bg-[#155dfc] !text-white py-2 rounded hover:bg-blue-700 !mt-7 "
        >
          Register
        </button>
      </form>
    </div>

  );
};

export default RegisterUserForm;