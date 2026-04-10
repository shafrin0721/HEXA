import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const customerData = [
  { name: 'Excellent', value: 30, fill: '#3b82f6' },
  { name: 'Great', value: 25, fill: '#60a5fa' },
  { name: 'Good', value: 20, fill: '#93c5fd' },
  { name: 'Poor', value: 15, fill: '#dbeafe' },
  { name: 'Bad', value: 10, fill: '#bfdbfe' },
];

const unitsData = [
  { name: 'Open tickets', value: 45, fill: '#60a5fa' },
  { name: 'New tickets', value: 30, fill: '#3b82f6' },
];

const assignmentData = [
  { name: 'Assigned tickets', value: 60, fill: '#60a5fa' },
  { name: 'Unassigned tickets', value: 40, fill: '#93c5fd' },
];

const commentData = [
  { day: 'Mon', ai: 20, public: 15, internal: 10 },
  { day: 'Tue', ai: 25, public: 18, internal: 12 },
  { day: 'Wed', ai: 30, public: 22, internal: 15 },
  { day: 'Thu', ai: 28, public: 25, internal: 18 },
  { day: 'Fri', ai: 25, public: 20, internal: 12 },
  { day: 'Sat', ai: 15, public: 10, internal: 8 },
  { day: 'Sun', ai: 10, public: 8, internal: 5 },
];

export default function AdminCustomers() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Customer Management</h1>
          <p className="text-gray-600 mt-2">Welcome 👋</p>
          <p className="text-2xl font-bold">Swetha Aiyar</p>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">Today</button>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">Yesterday</button>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">3D</button>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">3 M</button>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">6 M</button>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">12 M</button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Unresolved Units */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-sm mb-4 uppercase">UNRESOLVED UNITS BY STATUS</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={unitsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {unitsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-1 text-sm">
              <p>🟦 Open tickets: 45</p>
              <p>🟦 New tickets: 30</p>
            </div>
          </div>

          {/* Assignment Status */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-sm mb-4 uppercase">UNRESOLVED UNITS BY ASSIGNMENT STATUS</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={assignmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {assignmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-1 text-sm">
              <p>🟦 Assigned tickets: 60</p>
              <p>🟦 Unassigned tickets: 40</p>
            </div>
          </div>

          {/* Satisfaction Ratings */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-sm mb-4 uppercase">SATISFACTION RATINGS</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-1 text-xs">
              <p>🟦 Excellent 😍</p>
              <p>🟦 Great 😊</p>
              <p>🟦 Good 😐</p>
              <p>🟦 Poor 😞</p>
              <p>🟦 Bad 😢</p>
            </div>
          </div>
        </div>

        {/* Agent Comments Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-sm mb-4 uppercase">AGENT COMMENTS BY DATE</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={commentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ai" stroke="#3b82f6" strokeWidth={2} name="AI" />
              <Line type="monotone" dataKey="public" stroke="#60a5fa" strokeWidth={2} name="Public comments" />
              <Line type="monotone" dataKey="internal" stroke="#93c5fd" strokeWidth={2} name="Internal comments" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Agents Productivity */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold mb-4">Agents Productivity</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Production per 1000 unit</p>
                <button className="text-xs text-gray-600">▼</button>
              </div>
              <p className="text-3xl font-bold">1.9 days</p>
              <p className="text-xs text-gray-600 mt-1">14% reduced from previous week</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Production per unit</p>
                <button className="text-xs text-gray-600">▼</button>
              </div>
              <p className="text-3xl font-bold">1.9 days</p>
              <p className="text-xs text-gray-600 mt-1">14% reduced from previous week</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
