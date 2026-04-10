import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Package, AlertCircle, TrendingUp } from 'lucide-react';

export default function AdminInventory() {
  const inventory = [
    { id: 1, name: 'Veritas Strength Tee', sku: 'VST-001', quantity: 245, status: 'In Stock', location: 'Warehouse A' },
    { id: 2, name: 'Chorale Noir Tee', sku: 'CNT-001', quantity: 12, status: 'Low Stock', location: 'Warehouse B' },
    { id: 3, name: 'Élan Focus Tee', sku: 'EFT-001', quantity: 0, status: 'Out of Stock', location: 'Warehouse C' },
    { id: 4, name: 'Divinus Path Tee', sku: 'DPT-001', quantity: 89, status: 'In Stock', location: 'Warehouse A' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Inventory Management</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Items</p>
                <p className="text-4xl font-bold mt-2">346</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">Low Stock Alert</p>
                <p className="text-4xl font-bold mt-2">5</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">Turnover Rate</p>
                <p className="text-4xl font-bold mt-2">87%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Inventory Items</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">
              + Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Product Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">SKU</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-gray-600">{item.sku}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{item.quantity}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.location}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:underline text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
