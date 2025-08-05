

// import { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [formData, setFormData] = useState({

//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);

//     try {
//       const response = await axios.post("http://localhost:5000/api/v1/user/login", formData);
//       setMessage({ type: "success", text: response.data.message });
//       setFormData({ email: "", password: "" });
//     } catch (error) {
//       const errMsg =
//         error.response?.data?.message || "Something went wrong!";
//       setMessage({ type: "error", text: errMsg });
//     }
//     localStorage.setItem('isAdminLoggedIn', 'true');

//   };


//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow ">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {message && (
//         <p
//           className={`mb-4 ${
//             message.type === "success" ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message.text}
//         </p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4 ">


//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded !mt-6"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded !mt-6"
//         />

//         <button
//           type="submit"
//           className="w-full bg-[#155dfc] text-white py-2 rounded hover:bg-blue-700 !mt-7"
//         >
//           Login
//         </button>

//       </form>
//     </div>
//   );
// };

// export default Login;











import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
      const response = await axios.post("http://localhost:5000/api/v1/user/login", formData);
      const res_data = await response.data;
      console.log("response from server", res_data);

      // localStorage.setItem("token", res_data.data.accessToken);
      // const token = localStorage.getItem("token");
      // console.log("Token stored in localStorage:", token);

      setMessage({ type: "success", text: response.data.message });
      setFormData({ email: "", password: "" });

    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong!";
      setMessage({ type: "error", text: errMsg });
    }
    // localStorage.setItem('isAdminLoggedIn', 'true');

  };


  return (
    <div className="max-w-md mx-auto p-6 border rounded-[10px] shadow-2xs flex flex-col items-center justify-center mt-[150px] bg-white ">
      <p className="text-[30px] font-bold ">Login</p>
      {message && (
        <p
          className={`mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 ">


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-[10px] !mt-6"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-[10px] !mt-6"
        />

      
        <span className="text-blue-500 cursor-pointer flex justify-end mt-2" 
        onClick={() => navigate('/forgetpassword')}>
          Forget Password?
        </span>

      

        <button
          type="submit"
          className="w-full bg-[#155dfc] !text-white py-2 rounded-[10px] hover:bg-blue-700 !mt-7 font-bold"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;