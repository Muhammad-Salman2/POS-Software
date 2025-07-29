// import React, { useState } from 'react';

// export default function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login data:', formData);
//     // Yahan API call ya logic add karo
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
   
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
      const res = await axios.post("http://192.168.3.236:5000/api/v1/user/login", formData);
      setMessage({ type: "success", text: res.data.message });
      setFormData({ email: "", password: "" });
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong!";
      setMessage({ type: "error", text: errMsg });
    }
    localStorage.setItem('isAdminLoggedIn', 'true');
    
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow ">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 ">
        {/* <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        /> */}

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

        <button
          type="submit"
          className="w-full bg-[#155dfc] text-white py-2 rounded hover:bg-blue-700 !mt-7"
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default Login;