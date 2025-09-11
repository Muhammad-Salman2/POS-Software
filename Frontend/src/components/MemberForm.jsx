import React, { useState } from "react";
import { api } from "../Instance/api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function MemberForm({ onMemberAdded, initialData, onClose }) {
  const [fullname, setFullname] = useState(initialData?.fullname || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const memberData = {
        fullname: fullname.trim(),
        email: email.trim(),
        ...(!initialData && { password }) // Only include password for new members
      };

      if (initialData) {
        await api.put(`/admin/members/update-member/${initialData.id}`, memberData);
        toast.success("Member updated successfully!");
      } else {
        const response = await api.post("/admin/members/add-member", memberData);
        toast.success("Member added successfully!");
        if (onMemberAdded) onMemberAdded(response.data);
      }
      
      if (onClose) onClose();
      if (!initialData) {
        setFullname("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#1C3333]">
          Full Name
        </label>
        <input
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter full name"
          className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
          required
          minLength="3"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#1C3333]">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
          required
        />
      </div>

      {!initialData && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#1C3333]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] text-[#1C3333] bg-white"
            required
            minLength="6"
          />
          <p className="text-xs text-[#1C3333]/70">
            Password must be at least 6 characters long with uppercase, lowercase, number, and special character
          </p>
        </div>
      )}

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
            "Update Member"
          ) : (
            "Create Member"
          )}
        </button>
      </div>
    </form>
  );
}