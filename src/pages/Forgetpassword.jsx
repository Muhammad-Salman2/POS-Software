

import React, { useState } from "react";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const steps = ["Email", "Verify OTP", "Reset"];

  const getStepStyle = (index) => {
    if (index + 1 < step) return "bg-green-500 text-white";
    if (index + 1 === step) return "bg-blue-600 text-white";
    return "bg-gray-300 text-gray-700";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
        {/* Connected Stepper */}
        <div className="flex items-center justify-between relative mb-10">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getStepStyle(index)}`}
              >
                {index + 1 < step ? "✓" : index + 1}
              </div>
              <span className={`mt-2 text-sm ${index + 1 === step ? "text-blue-600 font-semibold" : "text-gray-600"}`}>
                {label}
              </span>
            </div>
          ))}
          {/* Line under steps */}
          <div className="absolute top-5 left-5 right-5 h-1 bg-gray-300 z-0"></div>
          <div
            className="absolute top-5 left-5 h-1 bg-blue-600 z-0 transition-all duration-500"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>

        {/* Step Form */}
        <div className="space-y-6">
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-center text-gray-800">Forgot your password</h2>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setStep(2)}
                className="py-3 bg-[#155dfc] !text-white rounded-xl hover:bg-blue-700 transition w-[90px] h-[30px] !font-bold !mt-[10px] flex justify-center items-center !ml-[295px] "
              >
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Enter OTP</h2>

              <div className="flex justify-center gap-3">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length === 1 && i < 5) {
                        document.getElementById(`otp-${i + 1}`)?.focus();
                      } else if (value.length === 0 && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                    id={`otp-${i}`}
                    className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  />
                ))}
              </div>

              <button
                onClick={() => setStep(3)}
                className="py-3 bg-[#155dfc] !text-white rounded-xl hover:bg-blue-700 transition w-[90px] h-[40px] font-bold mt-6  flex justify-center !ml-[146px]"
              >
                Verify
              </button>
            </>

          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-center text-gray-800">Reset Your Password</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 !mt-[10px]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 !mt-[10px]"
              />
              <button
                onClick={() => alert("Password Reset Successful")}
                className="w-full py-3 !text-white rounded-xl font-semibold bg-[#155dfc] hover:bg-blue-700 transition !mt-[20px] "
              >
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
