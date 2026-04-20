// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { FileText, Play, Loader2 } from 'lucide-react';
import { adminAPI } from '../services/adminApi';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [taskFilter, setTaskFilter] = useState('In progress');

  useEffect(() => {
    fetchAllData();
  }, [taskFilter]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const statusMap = {
        'New': 'new',
        'In progress': 'in_progress',
        'Completed': 'completed'
      };
      
      const [statsRes, tasksRes, teamRes, activitiesRes] = await Promise.all([
        adminAPI.getDashboardStats().catch(err => ({ data: { success: false, data: null } })),
        adminAPI.getTasks(statusMap[taskFilter]).catch(err => ({ data: { success: false, data: [] } })),
        adminAPI.getTeamMembers().catch(err => ({ data: { success: false, data: [] } })),
        adminAPI.getRecentActivities().catch(err => ({ data: { success: false, data: [] } }))
      ]);

      if (statsRes.data.success && statsRes.data.data) {
        setStats(statsRes.data.data);
      } else {
        // Fallback stats
        setStats({
          newTasks: 11,
          inProgressTasks: 3,
          completedTasks: 3,
          newTasksChange: 5,
          inProgressChange: 8
        });
      }
      
      if (tasksRes.data.success && tasksRes.data.data) {
        setTasks(tasksRes.data.data);
      } else {
        setTasks([]);
      }
      
      if (teamRes.data.success && teamRes.data.data) {
        setTeamMembers(teamRes.data.data);
      } else {
        setTeamMembers([]);
      }
      
      if (activitiesRes.data.success && activitiesRes.data.data) {
        setActivities(activitiesRes.data.data);
      } else {
        setActivities([]);
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-black">Dashboard Overview</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">New Orders</p>
                <p className="text-4xl font-bold mt-2">{stats?.newTasks || 0}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {stats?.newTasksChange > 0 ? '+' : ''}{stats?.newTasksChange || 0} from yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-4xl font-bold mt-2">{stats?.inProgressTasks || 0}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {stats?.inProgressChange > 0 ? '+' : ''}{stats?.inProgressChange || 0} from yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Play size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-2">
                <button 
                  onClick={() => setTaskFilter('New')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    taskFilter === 'New' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  New Orders
                </button>
                <button 
                  onClick={() => setTaskFilter('In progress')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    taskFilter === 'In progress' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  In Progress
                </button>
                <button 
                  onClick={() => setTaskFilter('Completed')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    taskFilter === 'Completed' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium">{task.name}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'High' ? 'bg-red-100 text-red-600' : 
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{task.progress}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {task.date ? new Date(task.date).toLocaleDateString() : 'No date'}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {task.avatar || 'U'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No {taskFilter.toLowerCase()} tasks found
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Team Members</h3>
                <a href="/admin/users" className="text-blue-600 text-sm font-medium">View all</a>
              </div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {teamMembers.slice(0, 5).map((member) => (
                  <div 
                    key={member.id} 
                    className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    title={member.name}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                ))}
                {teamMembers.length > 5 && (
                  <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                    +{teamMembers.length - 5}
                  </button>
                )}
                <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition">
                  +
                </button>
              </div>
              <div className="text-xs text-gray-500 space-y-2">
                {teamMembers.slice(0, 5).map((member) => (
                  <p key={member.id} className="flex justify-between">
                    <span>{member.name}</span>
                    <span className="text-gray-400">{member.role}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Recent Activities</h3>
                <a href="#" className="text-blue-600 text-sm font-medium">View all</a>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <p className="font-medium text-sm">{activity.user || 'System'}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.action}</p>
                      {activity.file && (
                        <p className="text-xs text-blue-600 mt-1">📄 {activity.file}</p>
                      )}
                      {activity.text && (
                        <p className="text-xs text-gray-600 mt-1">{activity.text}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No recent activities
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}