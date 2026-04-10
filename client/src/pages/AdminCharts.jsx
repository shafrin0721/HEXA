import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { MapPin, Send } from 'lucide-react';

const revenueData = [
  { month: 'Jan', value: 200000 },
  { month: 'Feb', value: 180000 },
  { month: 'Mar', value: 220000 },
  { month: 'Apr', value: 150000 },
  { month: 'May', value: 190000 },
  { month: 'Jun', value: 200000 },
  { month: 'Jul', value: 100000 },
  { month: 'Aug', value: 120000 },
];

const shipmentData = [
  { status: 'Ongoing', value: 300, fill: '#3b82f6' },
  { status: 'Completed', value: 250, fill: '#1e40af' },
  { status: 'Delayed', value: 140, fill: '#93c5fd' },
];

const ordersData = [
  { category: 'Pending', value: 200 },
  { category: 'In Progress', value: 250 },
  { category: 'Completed', value: 300 },
];

const locationData = [
  { region: 'US & UK', value: 100, pct: '70%' },
  { region: 'Others', value: 44, pct: '26%' },
];

const channelData = [
  { channel: 'Online', value: 144, pct: '36%' },
  { channel: 'Store', value: 110, pct: '75%' },
];

const customerTypeData = [
  { type: 'Individuals', value: 110, pct: '79%' },
  { type: 'Businesses', value: 44, pct: '31%' },
];

const ordersTable = [
  { id: '#681-7063', status: 'New', amount: '$104', delivered: 'Target', seller: '...' },
  { id: '#681-7063', status: 'New', amount: '$952', delivered: 'Walmart', seller: '...' },
  { id: '#681-7063', status: 'Delivered', amount: '£169', delivered: 'Target', seller: '...' },
  { id: '#681-7063', status: 'New', amount: '$139', delivered: 'Target', seller: '...' },
  { id: '#681-7063', status: 'New', amount: '$579', delivered: 'Walmart', seller: '...' },
];

const activitiesData = [
  { user: 'Ryan Patel', action: 'Create a insight', file: '#10039/7887', time: '10 mins ago' },
  { user: 'Sophie Lin', action: 'Charge order status', text: 'updated sales form Target', time: '30 mins ago' },
];

const shipmentsData = [
  { id: '#12345', status: 'Completed', date: '• Delivered on 2023-08-15' },
  { id: '#12346', status: 'Ongoing', date: '• Estimated delivery on 2023-08-15' },
  { id: '#12347', status: 'Delayed', date: '• Expected delivery on 2023-08-22' },
];

export default function AdminCharts() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Charts and Tables</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Orders</h3>
              <div className="flex items-center gap-2 text-sm">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="px-3 py-1 border border-gray-200 rounded text-xs bg-transparent focus:outline-none"
                />
                <button className="px-3 py-1 text-gray-600">📅 Oct 25 - Oct 30</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Delivered to</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersTable.map((order, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-blue-600">{order.id}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{order.amount}</td>
                      <td className="py-3 px-4">{order.delivered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <a href="#" className="text-blue-600">Load more ↓</a>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Activities</h3>
              <button className="text-gray-600 hover:bg-gray-100 p-1 rounded">🔍</button>
            </div>
            <div className="space-y-4">
              {activitiesData.map((activity, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                  <p className="font-medium text-sm">{activity.user}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.action}</p>
                  {activity.file && (
                    <p className="text-xs text-blue-600 mt-1">📄 {activity.file}</p>
                  )}
                  {activity.text && (
                    <p className="text-xs text-gray-600 mt-1">{activity.text}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                </div>
              ))}
              <div className="mt-4 text-center">
                <a href="#" className="text-blue-600 text-xs font-medium">Load more ↓</a>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sources of Sales */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Sources of Sales</h3>
              <a href="#" className="text-blue-600 text-sm">📤 Export</a>
            </div>

            <div className="space-y-4">
              {/* Locations */}
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <MapPin size={16} /> Locations
                </p>
                {locationData.map((loc, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-600">{loc.region}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">${loc.value}k</span>
                      <span className="text-gray-400">{loc.pct}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Channels */}
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm font-medium mb-3">Channels</p>
                {channelData.map((ch, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-600">{ch.channel}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">${ch.value}k</span>
                      <span className="text-gray-400">{ch.pct}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Types */}
              <div>
                <p className="text-sm font-medium mb-3">Customers</p>
                {customerTypeData.map((cust, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-600">{cust.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">${cust.value}k</span>
                      <span className="text-gray-400">{cust.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Channels Pie */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Sales Channels</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#1e40af'][index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Types Pie */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Customer Types</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={customerTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {customerTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#1e40af'][index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipment Overview */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Shipment Overview</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={shipmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {shipmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <p className="text-3xl font-bold">690</p>
                  <p className="text-gray-600 text-sm">Total</p>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Recent Shipments</h4>
                  {shipmentsData.map((ship, idx) => (
                    <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                      <p className="text-sm text-blue-600 font-medium">{ship.id}</p>
                      <p className="text-xs text-gray-600"><span className="text-[8px] font-bold">{ship.status === 'Completed' ? '✓' : '●'}</span> {ship.status}</p>
                      <p className="text-xs text-gray-500 mt-1">{ship.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Overview</h3>
              <a href="#" className="text-blue-600 text-sm">📤 Export</a>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
