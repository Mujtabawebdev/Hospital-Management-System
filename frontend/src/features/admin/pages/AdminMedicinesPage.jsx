import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Input, Select, Textarea } from "../../../shared/components/ui";
import { Category } from "../../../shared/constants/constants.js";
import { addAdminMedicine, deleteAdminMedicine, getAdminMedicines, updateAdminMedicine } from "../api/adminMedicineApi.js";
import AdminSidebar from "../components/AdminSidebar.jsx";

const initialProductForm = {
  name: "",
  price: "",
  description: "",
  category: "",
  manufacturer: "",
  expiryDate: "",
  stock: "",
  discount: "0",
  image: null,
};

function AdminMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [pagination, setPagination] = useState({});
  const [productForm, setProductForm] = useState(initialProductForm);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState(initialProductForm);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    page: 1,
  });

  const loadMedicines = async () => {
    try {
      const data = await getAdminMedicines(filters);
      setMedicines(data.medicines || []);
      setPagination(data.pagination || {});
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load medicines");
    }
  };

  useEffect(() => {
    loadMedicines();
  }, [filters.page]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value, page: 1 }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    loadMedicines();
  };

  const handleDelete = async (medicineId) => {
    try {
      await deleteAdminMedicine(medicineId);
      toast.success("Medicine deleted");
      loadMedicines();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete medicine");
    }
  };

  const startEdit = (medicine) => {
    setEditingId(medicine._id);
    setEditForm({
      name: medicine.name || "",
      price: medicine.price || "",
      description: medicine.description || "",
      category: medicine.category || "",
      manufacturer: medicine.manufacturer || "",
      expiryDate: medicine.expiryDate ? medicine.expiryDate.slice(0, 10) : "",
      stock: medicine.stock || "",
      discount: medicine.discount || "0",
      image: null,
    });
  };

  const handleEditChange = (event) => {
    const { name, value, files } = event.target;
    setEditForm((current) => ({
      ...current,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await updateAdminMedicine(editingId, editForm);
      toast.success("Medicine updated");
      setEditingId("");
      setEditForm(initialProductForm);
      loadMedicines();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update medicine");
    }
  };

  const handleProductChange = (event) => {
    const { name, value, files } = event.target;
    setProductForm((current) => ({
      ...current,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!productForm.image) {
      toast.error("Medicine image is required");
      return;
    }

    try {
      setIsAdding(true);
      await addAdminMedicine(productForm);
      toast.success("Medicine added successfully");
      setProductForm(initialProductForm);
      event.target.reset();
      loadMedicines();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add medicine");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900">Medicine Marketplace</h1>
        <p className="mt-2 text-slate-600">Admin can list and manage medicine products here.</p>
      </div>

      <Card className="mb-6 p-4">
        <h2 className="mb-4 text-xl font-black text-slate-900">Add Product</h2>
        <form onSubmit={handleAddProduct} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Input
            label="Medicine name"
            name="name"
            value={productForm.name}
            onChange={handleProductChange}
            required
          />
          <Input
            label="Price"
            name="price"
            type="number"
            min="0"
            value={productForm.price}
            onChange={handleProductChange}
            required
          />
          <Select
            label="Category"
            name="category"
            value={productForm.category}
            onChange={handleProductChange}
            required
          >
            <option value="">Select category</option>
            {Category.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
          <Input
            label="Manufacturer"
            name="manufacturer"
            value={productForm.manufacturer}
            onChange={handleProductChange}
            required
          />
          <Input
            label="Expiry date"
            name="expiryDate"
            type="date"
            value={productForm.expiryDate}
            onChange={handleProductChange}
            required
          />
          <Input
            label="Stock"
            name="stock"
            type="number"
            min="0"
            value={productForm.stock}
            onChange={handleProductChange}
            required
          />
          <Input
            label="Discount"
            name="discount"
            type="number"
            min="0"
            value={productForm.discount}
            onChange={handleProductChange}
          />
          <Input
            label="Image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleProductChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={productForm.description}
            onChange={handleProductChange}
            className="md:col-span-2 xl:col-span-4"
            rows={3}
            required
          />
          <div className="md:col-span-2 xl:col-span-4">
            <Button type="submit" disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="mb-6 p-4">
        <form onSubmit={handleSearch} className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <Input
            name="search"
            placeholder="Search name, category, manufacturer..."
            value={filters.search}
            onChange={handleChange}
          />
          <Select name="category" value={filters.category} onChange={handleChange}>
            <option value="">All categories</option>
            {Category.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
          <Button type="submit">Search</Button>
        </form>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="p-3">Medicine</th>
                <th className="p-3">Category</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length === 0 ? (
                <tr>
                  <td className="p-5 text-center text-slate-500" colSpan={7}>
                    No medicines found.
                  </td>
                </tr>
              ) : (
                medicines.map((medicine) => (
                  <React.Fragment key={medicine._id}>
                    <tr className="border-t border-slate-100">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-black text-slate-900">{medicine.name}</p>
                            <p className="line-clamp-1 max-w-xs text-xs text-slate-500">
                              {medicine.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{medicine.category}</td>
                      <td className="p-3">{medicine.manufacturer}</td>
                      <td className="p-3">Rs {medicine.price}</td>
                      <td className="p-3">{medicine.stock}</td>
                      <td className="p-3">{medicine.discount}%</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => startEdit(medicine)}>
                            Edit
                          </Button>
                          <Button
                            variant="red"
                            size="sm"
                            onClick={() => handleDelete(medicine._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {editingId === medicine._id && (
                      <tr className="border-t border-slate-100 bg-slate-50">
                        <td className="p-4" colSpan={7}>
                          <form onSubmit={handleUpdate} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <Input label="Name" name="name" value={editForm.name} onChange={handleEditChange} required />
                            <Input label="Price" name="price" type="number" min="0" value={editForm.price} onChange={handleEditChange} required />
                            <Select label="Category" name="category" value={editForm.category} onChange={handleEditChange} required>
                              <option value="">Select category</option>
                              {Category.map((item) => (
                                <option key={item.name} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </Select>
                            <Input label="Manufacturer" name="manufacturer" value={editForm.manufacturer} onChange={handleEditChange} required />
                            <Input label="Expiry date" name="expiryDate" type="date" value={editForm.expiryDate} onChange={handleEditChange} required />
                            <Input label="Stock" name="stock" type="number" min="0" value={editForm.stock} onChange={handleEditChange} required />
                            <Input label="Discount" name="discount" type="number" min="0" value={editForm.discount} onChange={handleEditChange} />
                            <Input label="New image" name="image" type="file" accept="image/*" onChange={handleEditChange} />
                            <Textarea label="Description" name="description" value={editForm.description} onChange={handleEditChange} className="md:col-span-2 xl:col-span-4" rows={3} required />
                            <div className="flex gap-2 md:col-span-2 xl:col-span-4">
                              <Button type="submit">Save Changes</Button>
                              <Button type="button" variant="secondary" onClick={() => setEditingId("")}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            disabled={filters.page <= 1}
            onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
          >
            Previous
          </Button>
          <span className="text-sm font-bold text-slate-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={filters.page >= pagination.totalPages}
            onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
          >
            Next
          </Button>
        </div>
      )}
      </main>
    </div>
  );
}

export default AdminMedicinesPage;
