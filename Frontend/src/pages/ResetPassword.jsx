import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../Instance/api';
import { Loader, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate('/forget-password');
    }
  }, [location, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.post('/user/reset-password', {
        email,
        otp,
        newPassword
      });
      
      if (response.status === 200) {
        toast.success('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C3333] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-[#1C3333]/20"
      >
        <div className="bg-white p-8 text-center border-b border-[#1C3333]/20">
          <h1 className="text-2xl font-bold text-[#1C3333]">Create New Password</h1>
          <p className="mt-2 text-[#1C3333]/80">
            OTP sent to <span className="font-semibold">{email}</span>
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-[#1C3333]">
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="block w-full px-4 py-2.5 border border-[#1C3333]/30 rounded-md focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] transition text-[#1C3333] bg-white"
                placeholder="Enter 6-digit code"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium text-[#1C3333]">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#1C3333]/60" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-10 py-2.5 border border-[#1C3333]/30 rounded-md focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] transition text-[#1C3333] bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#1C3333]/60 hover:text-[#1C3333]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#1C3333]/60 hover:text-[#1C3333]" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1C3333]">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="block w-full pl-4 py-2.5 border border-[#1C3333]/30 rounded-md focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] transition text-[#1C3333] bg-white"
                placeholder="••••••••"
              />
            </div>

            <div className="flex space-x-4">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/forget-password')}
                className="flex-1 py-3 cursor-pointer px-4 border border-[#1C3333]/30 text-[#1C3333] font-medium rounded-md hover:bg-[#1C3333]/10 transition-colors"
              >
                Back
              </motion.button>
              
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`flex-1 py-3 cursor-pointer px-4 rounded-md font-medium text-white transition-colors ${
                  loading
                    ? "bg-[#1C3333]/80 cursor-not-allowed"
                    : "bg-[#1C3333] hover:bg-[#1C3333]/90 shadow-sm"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin h-5 w-5" />
                    Resetting...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;