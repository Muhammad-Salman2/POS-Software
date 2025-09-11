import React from "react";
import SaleForm from "../components/SaleForm";
import toast from "react-hot-toast";

export default function NewSale() {
  const handleSaleAdded = () => {
    toast.success("Sale added successfully!");
  };  
  return (
    <div>
      <SaleForm onSaleAdded={handleSaleAdded} />
    </div>
  );
}
