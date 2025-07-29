import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import React, { useState, useEffect } from 'react';

export default function Product() {
  const categories = ['Electronics', 'Furniture', 'Accessories', 'Fashion', 'Home Decor', 'Pharma', 'Health & Beauty', 'Sports', 'Toys', 'Books'];
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // localStorage se data load karo initial state ke liye
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    costPrice: '',
    stockQuantity: '',
    unit: '',
    categoryIndex: '',
    categoryName: '',
  });

  // Jab products update ho to localStorage me save karo
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoryIndex') {
      const index = parseInt(value);
      setFormData({
        ...formData,
        categoryIndex: index,
        categoryName: categories[index],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = formData;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, formData]);
    }
    setFormData({
      name: '',
      price: '',
      costPrice: '',
      stockQuantity: '',
      unit: '',
      categoryIndex: '',
      categoryName: '',
    });
    setIsOpen(false);
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen border-black flex flex-col items-center">
      <h1 className="text-3xl !font-bold mb-6 flex items-center">Products</h1>



      {/* Add Button */}
      {/* <button
        onClick={() => {
          setIsOpen(true);
          setEditIndex(null);
          setFormData({
            name: '',
            price: '',
            costPrice: '',
            stockQuantity: '',
            unit: '',
            categoryIndex: '',
            categoryName: '',
          });
        }}
        className="mb-6 bg-[#155dfc] !text-white font-semibold px-7 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      >
        + Add New Product
      </button>
 */}







      {/* add product form code start */}


      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="bg-[#155dfc] !text-white" onClick={() => {
            setIsOpen(true);
            setEditIndex(null);
            setFormData({
              name: '',
              price: '',
              costPrice: '',
              stockQuantity: '',
              unit: '',
              categoryIndex: '',
              categoryName: '',
            });
          }}> Add New Product</Button>
        </SheetTrigger>

        {isOpen && (
          <SheetContent>
            <SheetHeader>

              <SheetTitle>{editIndex !== null ? 'Edit' : 'Add'}  Add Product Form</SheetTitle>
              <SheetDescription>
                please fill out the form below to add a new product.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Product name</Label>
                  <Input placeholder="Enter product name" name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required />

                  <Label htmlFor="sheet-demo-username">Price</Label>
                  <Input placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Costprice</Label>
                  <Input placeholder="CostPrice"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Stockquantity</Label>
                  <Input placeholder="Stockquantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Unit</Label>
                  <Input placeholder="Unit, kg, eg"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* select catogary in form code start */}
              <Select
                value={formData.categoryIndex}
                onValueChange={(value) => {
                  const index = parseInt(value);
                  setFormData({
                    ...formData,
                    categoryIndex: index,
                    categoryName: categories[index],
                  });
                }}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a catogary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Catogary</SelectLabel>
                    {/* <SelectItem value="" disabled>Acceceries</SelectItem> */}
                    {categories.map((cat, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {cat}

                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* select catogary in form code end */}

              <SheetFooter>
                <Button type="submit" className="bg-[#155dfc] font-bold !text-white" > {editIndex !== null ? 'Update' : 'Save'}</Button>
                <SheetClose asChild>
                  <Button className="bg-[#155dfc] font-bold !text-white"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setEditIndex(null);
                    }}
                  >Cencel</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        )}
      </Sheet>
      {/* add product form code end */}


















      {/* 
      add product form code start

      
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="bg-[#155dfc] !text-white"  onClick={() => {
              setIsOpen(true);
              setEditIndex(null);
              setFormData({
                name: '',
                price: '',
                costPrice: '',
                stockQuantity: '',
                unit: '',
                categoryIndex: '',
                categoryName: '',
              });
            }}> Add New Product</Button>
          </SheetTrigger>

  {isOpen && (
          <SheetContent>
            <SheetHeader>

              <SheetTitle>{editIndex !== null ? 'Edit' : 'Add'}  Add Product Form</SheetTitle>
              <SheetDescription>
                please fill out the form below to add a new product.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Product name</Label>
                <Input id="sheet-demo-name" placeholder="Enter product name" name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required />
                  

                  <Label htmlFor="sheet-demo-username">Price</Label>
                <Input id="sheet-demo-username" placeholder="Enter price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  />
              </div>
             
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Costprice</Label>
                <Input id="sheet-demo-username" placeholder="CostPrice"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  placeholder="Cost Price"
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  />
                  </div>
                  <div className="grid gap-3">
                  
                  <Label htmlFor="sheet-demo-username">Stockquantity</Label>
                  <Input id="sheet-demo-username" placeholder="Stockquantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  placeholder="Stock Quantity"
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  />
                  </div>
                  <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">unit</Label>
                  <Input id="sheet-demo-username" placeholder="unit, kg, eg"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="Unit (e.g. kg, pcs)"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  />
                  </div>
                  </div>

            select catogary in form code start
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a catogary" />
              </SelectTrigger>
              <SelectContent>
              <SelectGroup
              name="categoryIndex"
              value={formData.categoryIndex}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required>
              <SelectLabel>Select Catogary</SelectLabel>
              <SelectItem value="" disabled>Acceceries</SelectItem>
                  {categories.map((cat, index) => (
                    <SelectItem key={index} value={index}>
                    {cat}
                    </SelectItem>
                  ))}
                  
                  </SelectGroup>
                  
                  </SelectContent>
                  </Select>
                  
                  select catogary in form code start
                  
                  <SheetFooter>
              <Button type="submit" className="bg-[#155dfc] font-bold !text-white" > {editIndex !== null ? 'Update' : 'Save'}</Button>
              <SheetClose asChild>
              <Button className="bg-[#155dfc] font-bold !text-white"
              type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setEditIndex(null);
                  }}
                className="bg-[#155dfc] !text-white font-semibold px-6 py-3 rounded-2xl  transition"

                >Cencel</Button>
              </SheetClose>
              </SheetFooter>
              </SheetContent>
           select catogary in form code start 
        </Sheet>
      )}
      add product form code end
 */}






      {/* Modal */}
      {/* {isOpen && (
        <div className="border-black fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className=" border-black bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">{editIndex !== null ? 'Edit' : 'Add'} Product</h2>
          <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
              Inputs
              <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                />
                <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                placeholder="Cost Price"
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                />
                <input
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="Stock Quantity"
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                />
              <input
              name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unit (e.g. kg, pcs)"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              
              Category Dropdown
              <select
              name="categoryIndex"
              value={formData.categoryIndex}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              >
              <option value="" disabled>
                  Select Category
                  </option>
                  {categories.map((cat, index) => (
                    <option key={index} value={index}>
                    {cat}
                    </option>
                  ))}
              </select>
              
              Buttons
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setEditIndex(null);
                  }}
                  className="bg-[#155dfc] !text-white font-semibold px-6 py-3 rounded-2xl  transition"
                  >
                  Cancel
                  </button>
                  <button
                  type="submit"
                  className="bg-[#155dfc] !text-white font-semibold px-6 py-3 rounded-2xl  transition"
                >
                  {editIndex !== null ? 'Update' : 'Save'}
                </button>
                </div>
                </form>
                </div>
                </div>
              )} */}


      {/* Table */}
      <div className="mt-8 overflow-x-auto border-black">
        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No products added yet.</p>
        ) : (
          <table className="min-w-full text-left border-collapse border border-gray-300 rounded-lg shadow-lg bg-white">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-6 py-3 border border-gray-300">#</th>
                <th className="px-6 py-3 border border-gray-300">Name</th>
                <th className="px-6 py-3 border border-gray-300">Category</th>
                <th className="px-6 py-3 border border-gray-300">Price</th>
                <th className="px-6 py-3 border border-gray-300">Cost</th>
                <th className="px-6 py-3 border border-gray-300">Stock</th>
                <th className="px-6 py-3 border border-gray-300">Unit</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.name}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.categoryName}</td>
                  <td className="px-6 py-3 border border-gray-300">Rs. {p.price}</td>
                  <td className="px-6 py-3 border border-gray-300">Rs. {p.costPrice}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.stockQuantity}</td>
                  <td className="px-6 py-3 border border-gray-300">{p.unit}</td>
                  <td className="px-6 py-3 border border-gray-300 text-center gap-1 flex justify-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="inline-block px-4 py-1 rounded-2xl bg-[#155dfc] !text-white font-semibold  transition "
                      aria-label={`Edit product ${p.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="inline-block px-4 py-1 rounded-2xl bg-[#155dfc] !text-white font-semibold transition "
                      aria-label={`Delete product ${p.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}