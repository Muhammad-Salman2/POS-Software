import React from 'react';
import { X } from 'lucide-react';

const FilterInput = ({ label, value, onChange, placeholder, type = "text", options }) => {
  const hasValue = value && value.trim() !== '';

  const clearFilter = () => {
    onChange('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-[#1C3333] mb-1">
        {label}
      </label>
      <div className="relative">
        {type === "select" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md text-sm focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] cursor-pointer pr-10"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#1C3333]/30 rounded-md text-sm focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] pr-10"
          />
        )}
        {hasValue && (
          <button
            onClick={clearFilter}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1C3333]/50 hover:text-[#1C3333] cursor-pointer"
            title="Clear filter"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterInput;