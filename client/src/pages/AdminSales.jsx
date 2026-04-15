import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesMetrics = [
  { label: 'Total Sales', value: '$500,000', change: '+25%', vs: 'Target: $600,000' },
  { label: 'New Customer', value: '100', change: '+25%', vs: 'Target: 150' },
  { label: 'New Leads', value: '100', change: '-25%', vs: 'Target: 150' },
];

const leadsData = [
  { name: 'New Leads', value: 100, fill: '#3b82f6' },
  { name: 'Contacted', value: 204, fill: '#1e40af' },
  { name: 'Qualified', value: 150, fill: '#93c5fd' },
];

const pipelineData = [
  { name: 'Prospects', value: 200, fill: '#3b82f6' },
  { name: 'Opportunities', value: 41, fill: '#1e40af' },
];

const opportunitiesData = [
  { name: 'Prospecting', value: 29, fill: '#3b82f6' },
  { name: 'Proposal', value: 5, fill: '#1e40af' },
  { name: 'Negotiation', value: 7, fill: '#93c5fd' },
];

const leadsTable = [
  { id: 'Contact#4', name: 'Brian Harris', email: 'Brianthharris@gmail.com', phone: '(713) 814-1414', revenue: '$4,144' },
  { id: 'Contact#4', name: 'Andrea Sanchez', email: 'Andasanchez@gmail.com', phone: '(205) 831-9298', revenue: '$5,490' },
  { id: 'Contact#4', name: 'Ashley Davis', email: 'AshleyDavis@gmail.com', phone: '(610) 517-8201', revenue: '$3,332' },
  { id: 'Contact#4', name: 'Richard Davis', email: 'RichardD@gmail.com', phone: '(914) 695-1636', revenue: '$4,342' },
];

export default function AdminSales() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Sales</h1>
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

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salesMetrics.map((metric, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                  {idx === 0 ? '💵' : '👤'}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{metric.label}</p>
              <p className="text-3xl font-bold mt-2">{metric.value}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={metric.change.includes('+') ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{metric.vs}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leads Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Leads Summary</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leadsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {leadsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold">454</p>
              <p className="text-gray-600 text-sm">Total</p>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-gray-700">🟦 New Leads: 100</p>
              <p className="text-gray-700">🟦 Contacted: 204</p>
              <p className="text-gray-700">🟦 Qualified: 150</p>
            </div>
          </div>

          {/* Sales Pipeline */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Sales Pipeline</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { name: 'Prospects', value: 200, pct: '100%' },
                { name: 'Opportunities', value: 41, pct: '20.5%' },
              ]} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              <p>🟦 Prospects: 200</p>
              <p>🟦 Opportunities: 41</p>
              <p>🟦 Negotiation: 10</p>
            </div>
          </div>

          {/* Opportunities */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Opportunities</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={opportunitiesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {opportunitiesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold">41</p>
              <p className="text-gray-600 text-sm">Total</p>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>🟦 Prospecting: 29</p>
              <p>🟦 Proposal: 5</p>
              <p>🟦 Negotiation: 7</p>
            </div>
          </div>
        </div>

        {/* New Leads Table */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold mb-4">New Leads</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Contact ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Phone</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Est. revenue</th>
                </tr>
              </thead>
              <tbody>
                {leadsTable.map((lead, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-blue-600">{lead.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{lead.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.phone}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{lead.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <p className="text-sm text-gray-600">Show 1 to 5 of 100 results</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
