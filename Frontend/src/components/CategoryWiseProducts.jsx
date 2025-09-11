import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CategoryWiseProducts = ({ data }) => {
  const totalProducts = data?.reduce(
    (acc, item) => acc + item.products,
    0
  );

  const updatedData = data?.map((item) => ({
    ...item,
    percentage: ((item.products / totalProducts) * 100).toFixed(1),
  }));

  const maxProducts = Math.max(
    ...(data || []).map((d) => d.products),
    0
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Category Wise Products</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={updatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} tick={{ angle: -25, textAnchor: 'end', fontSize: 12 }} height={80} />
          <YAxis domain={[0, maxProducts + (maxProducts * 0.2)]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="products" fill="#4B5563">
            <LabelList
              dataKey="percentage"
              position="top"
              formatter={(val) => `${val}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryWiseProducts;