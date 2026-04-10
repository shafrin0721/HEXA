import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Package, Clock, TrendingUp } from 'lucide-react';

const lineData = [
  { name: '15', revenue: 400, cost: 240 },
  { name: '16', revenue: 300, cost: 221 },
  { name: '17', revenue: 420, cost: 229 },
  { name: '18', revenue: 500, cost: 200 },
  { name: '19', revenue: 490, cost: 220 },
  { name: '20', revenue: 490, cost: 250 },
  { name: '21', revenue: 390, cost: 210 },
];

const shipmentData = [
  { name: 'Ongoing', value: 300, fill: '#3b82f6' },
  { name: 'Completed', value: 250, fill: '#1e40af' },
  { name: 'Delayed', value: 140, fill: '#93c5fd' },
];

const countryData = [
  { month: '15', italy: 40, canada: 20, us: 30 },
  { month: '16', italy: 50, canada: 35, us: 45 },
  { month: '17', italy: 70, canada: 45, us: 60 },
  { month: '18', italy: 55, canada: 48, us: 40 },
  { month: '19', italy: 65, canada: 40, us: 50 },
  { month: '20', italy: 45, canada: 35, us: 30 },
  { month: '21', italy: 40, canada: 30, us: 35 },
];

export default function LogisticsDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Logistics Dashboard</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <p className="text-3xl font-bold mt-2">$152k</p>
                <p className="text-green-600 text-sm mt-2">↑ 23%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Total revenue compared to 7 days ago</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cost</p>
                <p className="text-3xl font-bold mt-2">$82k</p>
                <p className="text-red-600 text-sm mt-2">↓ 25%</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Total cost compared to 7 days ago</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Shipments</p>
                <p className="text-3xl font-bold mt-2">2,140</p>
                <p className="text-red-600 text-sm mt-2">↓ 23%</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package size={20} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Total shipments compared to 7 days ago</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Delivery Time</p>
                <p className="text-3xl font-bold mt-2">1.7 days</p>
                <p className="text-red-600 text-sm mt-2">↑ 25%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Avg delivery time compared to 7 days ago</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue vs Cost Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Revenue & Cost Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Profit by Country */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Profit by Country ($)</h3>
              <button className="text-sm text-gray-600">Top 3 ↓</button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="italy" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="canada" stroke="#60a5fa" strokeWidth={2} />
                <Line type="monotone" dataKey="us" stroke="#93c5fd" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Warehouse Activities */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Warehouse Activities</h3>
              <a href="#" className="text-blue-600 text-sm font-medium">View all</a>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={shipmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {shipmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold">75%</p>
              <p className="text-gray-600 text-sm">Space used</p>
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div>
                <p className="text-blue-600">● Incoming: 15</p>
              </div>
              <div>
                <p className="text-blue-800">● Outgoing: 28</p>
              </div>
            </div>
          </div>

          {/* Shipment Overview */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Shipment Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={shipmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                >
                  {shipmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold">690</p>
              <p className="text-gray-600 text-sm">Total</p>
            </div>
          </div>

          {/* Orders Bar Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Orders</h3>
              <a href="#" className="text-blue-600 text-sm font-medium">View all</a>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Pending', value: 200 },
                { name: 'In Progress', value: 250 },
                { name: 'Completed', value: 300 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
