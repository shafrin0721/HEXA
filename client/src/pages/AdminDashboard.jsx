import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { FileText, Play, CheckCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const taskData = [
  { name: 'Sales', priority: 'High', progress: 75, date: '13/04/2025', avatar: '👤' },
  { name: 'Transport', priority: 'High', progress: 50, date: '25/09/2025', avatar: '👤' },
  { name: 'Sales', priority: 'High', progress: 23, date: '30/11/2024', avatar: '👤' },
  { name: 'Branding', priority: 'Low', progress: 25, date: '21/03/2025', avatar: '👤' },
];

const teamMembers = [
  { name: 'You', avatar: '👤' },
  { name: 'Adam', avatar: '👤' },
  { name: 'Ryan', avatar: '👤' },
];

const recentActivities = [
  { user: 'Ryan Patel', action: 'Add file on sale', file: 'Plan 2025.pdf', time: '10 mins ago' },
  { user: 'Ryan Patel', action: 'Comment on sale', text: 'updated sales form Target', time: '30 mins ago' },
  { user: 'Sophie Lin', action: 'Add file on Inventory', file: 'Plan 2025.pdf', time: 'Yesterday' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Dashboard Overview</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">New</p>
                <p className="text-4xl font-bold mt-2">5</p>
                <p className="text-gray-500 text-sm mt-2">+5 from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">In progress</p>
                <p className="text-4xl font-bold mt-2">25</p>
                <p className="text-gray-500 text-sm mt-2">+8 from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Play size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">New</button>
                <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium">In progress</button>
                <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">Completed</button>
              </div>
            </div>

            <div className="space-y-4">
              {taskData.map((task, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium">{task.name}</p>
                      <span className={`text-xs px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{task.progress}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{task.date}</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
                    {task.avatar}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team & Activities */}
          <div className="space-y-6">
            {/* Team */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">team</h3>
                <a href="#" className="text-blue-600 text-sm font-medium">View all</a>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {member.name[0]}
                  </div>
                ))}
                <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">+</button>
              </div>
              <div className="text-xs text-gray-500 space-y-2">
                {teamMembers.map((member, idx) => (
                  <p key={idx}>{member.name}</p>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Recent activities</h3>
                <a href="#" className="text-blue-600 text-sm font-medium">View all</a>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
