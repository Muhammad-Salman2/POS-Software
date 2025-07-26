// src/components/ProductTable.jsx
import React from 'react';
import { Table } from 'antd';

const ProductTable = () => {
  const dataSource = [
    {
      key: '1',
      name: 'i phone',
      price: 60000,
      costPrice: 50000,
      stockQuantity: '20',
      catogary: 'electronics',
    },
    {
      key: '2',
      name: 'chear',
      price: 1000,
      costPrice: 800,
      stockQuantity: '20',
      catogary: 'furniture',
    },
    {
      key: '3',
      name: 'shoes',
      price: 1500,
      costPrice: 1200,
      stockQuantity: '50',
      catogary: 'fashion',
    },
    {
      key: '4',
      name: 'bottels',
      price: 600,
      costPrice: 500,
      stockQuantity: '100',
      catogary: 'accessories',
    },
    {
      key: '5',
      name: 'Hanging beg',
      price: 2000,
      costPrice: 1600,
      stockQuantity: '30',
      catogary: 'fashion',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Cost Price',
      dataIndex: 'costPrice',
      key: 'costPrice',
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    {
      title: 'Category',
      dataIndex: 'catogary',
      key: 'catogary',
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <Table dataSource={dataSource} columns={columns} />
      <h1 className="text-xl font-semibold mt-4">This is the product page</h1>
    </div>
  );
};

export default ProductTable;
