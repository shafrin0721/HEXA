// src/pages/AdminSales.jsx - WITH MODAL AND EDITABLE STATUS
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle, RefreshCw, Eye, Mail, CheckCircle, Clock, X, Edit2, Save } from 'lucide-react';
import adminAPI from '../services/adminApi';

export default function AdminSales() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('3D');
  
  // State for charts data
  const [salesMetrics, setSalesMetrics] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  
  // Modal state
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  // Track which APIs failed
  const [apiErrors, setApiErrors] = useState({
    metrics: false,
    leads: false,
    pipeline: false,
    opportunities: false,
    contacts: false
  });

  useEffect(() => {
    fetchSalesData();
  }, [dateRange]);

  const fetchSalesData = async () => {
    setLoading(true);
    setError(null);
    setApiErrors({
      metrics: false,
      leads: false,
      pipeline: false,
      opportunities: false,
      contacts: false
    });
    
    try {
      const [
        metricsRes,
        leadsRes,
        pipelineRes,
        opportunitiesRes,
        contactsRes
      ] = await Promise.all([
        adminAPI.getSalesMetrics(dateRange),
        adminAPI.getLeadsData(),
        adminAPI.getPipelineData(),
        adminAPI.getOpportunitiesData(),
        adminAPI.getContacts()
      ]);

      if (metricsRes.data.success && metricsRes.data.data && metricsRes.data.data.length > 0) {
        setSalesMetrics(metricsRes.data.data);
      } else {
        setApiErrors(prev => ({ ...prev, metrics: true }));
      }

      if (leadsRes.data.success && leadsRes.data.data && leadsRes.data.data.length > 0) {
        setLeadsData(leadsRes.data.data);
      } else {
        setApiErrors(prev => ({ ...prev, leads: true }));
      }

      if (pipelineRes.data.success && pipelineRes.data.data && pipelineRes.data.data.length > 0) {
        setPipelineData(pipelineRes.data.data);
      } else {
        setApiErrors(prev => ({ ...prev, pipeline: true }));
      }

      if (opportunitiesRes.data.success && opportunitiesRes.data.data && opportunitiesRes.data.data.length > 0) {
        setOpportunitiesData(opportunitiesRes.data.data);
      } else {
        setApiErrors(prev => ({ ...prev, opportunities: true }));
      }

      if (contactsRes.data.success && contactsRes.data.data && contactsRes.data.data.length > 0) {
        setContactsData(contactsRes.data.data);
      } else {
        setApiErrors(prev => ({ ...prev, contacts: true }));
      }

      const allFailed = Object.values(apiErrors).every(v => v === true);
      if (allFailed) {
        setError('Unable to fetch any sales data. Please check your database connection.');
      }

    } catch (err) {
      console.error('Error fetching sales data:', err);
      setError('Failed to connect to the server. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const updateContactStatus = async (id, status) => {
    setUpdatingStatus(true);
    try {
      const response = await adminAPI.updateContactStatus(id, status);
      if (response.data.success) {
        // Update local state
        setContactsData(prevContacts =>
          prevContacts.map(contact =>
            contact.id === id ? { ...contact, status: status } : contact
          )
        );
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({ ...selectedContact, status: status });
        }
        setEditingStatus(false);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setNewStatus(contact.status);
    setEditingStatus(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    setEditingStatus(false);
  };

  const totalLeads = leadsData.reduce((sum, item) => sum + (item.value || 0), 0);
  const totalOpportunities = opportunitiesData.reduce((sum, item) => sum + (item.value || 0), 0);
  const pipelineTotal = pipelineData.reduce((sum, item) => sum + (item.value || 0), 0);
  
  const unreadCount = contactsData.filter(contact => contact.status === 'unread').length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Data</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={fetchSalesData}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={18} />
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const hasAnyData = salesMetrics.length > 0 || leadsData.length > 0 || pipelineData.length > 0 || 
                     opportunitiesData.length > 0 || contactsData.length > 0;

  if (!hasAnyData) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h2>
            <p className="text-gray-600 mb-6">No sales data found in the database.</p>
            <button 
              onClick={fetchSalesData}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 text-black">
        <div>
          <h1 className="text-4xl font-bold">Sales Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome 👋</p>
          <p className="text-2xl font-bold">Sales Analytics</p>
        </div>

        {Object.values(apiErrors).some(v => v === true) && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} />
              <span>Some data could not be loaded. The charts below may be incomplete.</span>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => handleDateRangeChange('today')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${dateRange === 'today' ? 'bg-blue-500 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>Today</button>
          <button onClick={() => handleDateRangeChange('yesterday')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${dateRange === 'yesterday' ? 'bg-blue-500 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>Yesterday</button>
          <button onClick={() => handleDateRangeChange('3D')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${dateRange === '3D' ? 'bg-blue-500 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>3D</button>
          <button onClick={() => handleDateRangeChange('3M')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${dateRange === '3M' ? 'bg-blue-500 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>3 M</button>
          <button onClick={() => handleDateRangeChange('6M')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${dateRange === '6M' ? 'bg-blue-500 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>6 M</button>
          <button onClick={() => handleDateRangeChange('12M')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${dateRange === '12M' ? 'bg-blue-500 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>12 M</button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apiErrors.metrics ? (
            <div className="col-span-3 text-center py-8 text-gray-500">
              <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
              <p>Unable to load sales metrics</p>
              <button onClick={fetchSalesData} className="mt-2 text-blue-600 text-sm hover:underline">Retry</button>
            </div>
          ) : salesMetrics.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500">No sales metrics available</div>
          ) : (
            salesMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">{idx === 0 ? '💵' : '👤'}</div>
                </div>
                <p className="text-gray-600 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold mt-2">{metric.value}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={metric.change?.includes('+') ? 'text-green-600' : 'text-red-600'}>{metric.change}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{metric.vs}</p>
              </div>
            ))
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leads Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Leads Summary</h3>
            {apiErrors.leads ? (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                <div className="text-center">
                  <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>Unable to load leads data</p>
                  <button onClick={fetchSalesData} className="mt-2 text-blue-600 text-sm hover:underline">Retry</button>
                </div>
              </div>
            ) : leadsData.length === 0 ? (
              <div className="flex items-center justify-center h-[250px] text-gray-500">No leads data available</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={leadsData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}>
                      {leadsData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill || ['#3b82f6', '#1e40af', '#93c5fd'][index % 3]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center"><p className="text-3xl font-bold">{totalLeads}</p><p className="text-gray-600 text-sm">Total</p></div>
                <div className="mt-4 space-y-2 text-sm">{leadsData.map((item, idx) => (<p key={idx} className="text-gray-700">🟦 {item.name}: {item.value}</p>))}</div>
              </>
            )}
          </div>

          {/* Sales Pipeline */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Sales Pipeline</h3>
            {apiErrors.pipeline ? (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                <div className="text-center">
                  <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>Unable to load pipeline data</p>
                  <button onClick={fetchSalesData} className="mt-2 text-blue-600 text-sm hover:underline">Retry</button>
                </div>
              </div>
            ) : pipelineData.length === 0 ? (
              <div className="flex items-center justify-center h-[250px] text-gray-500">No pipeline data available</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pipelineData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2 text-sm">
                  {pipelineData.map((item, idx) => (<p key={idx}>🟦 {item.name}: {item.value}</p>))}
                  <p>🟦 Conversion Rate: {pipelineTotal > 0 ? Math.round((pipelineData[1]?.value / pipelineData[0]?.value) * 100) : 0}%</p>
                </div>
              </>
            )}
          </div>

          {/* Opportunities */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Opportunities</h3>
            {apiErrors.opportunities ? (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                <div className="text-center">
                  <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>Unable to load opportunities data</p>
                  <button onClick={fetchSalesData} className="mt-2 text-blue-600 text-sm hover:underline">Retry</button>
                </div>
              </div>
            ) : opportunitiesData.length === 0 ? (
              <div className="flex items-center justify-center h-[250px] text-gray-500">No opportunities data available</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={opportunitiesData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}>
                      {opportunitiesData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill || ['#3b82f6', '#1e40af', '#93c5fd'][index % 3]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center"><p className="text-3xl font-bold">{totalOpportunities}</p><p className="text-gray-600 text-sm">Total</p></div>
                <div className="mt-4 space-y-2 text-sm">{opportunitiesData.map((item, idx) => (<p key={idx}>🟦 {item.name}: {item.value}</p>))}</div>
              </>
            )}
          </div>
        </div>

        {/* Contact Messages Table with Modal */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Contact Messages</h3>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <Mail size={14} />
                {unreadCount} unread
              </div>
            )}
          </div>
          
          {apiErrors.contacts ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
              <p>Unable to load contact messages</p>
              <button onClick={fetchSalesData} className="mt-2 text-blue-600 text-sm hover:underline">Retry</button>
            </div>
          ) : contactsData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No contact messages found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Message</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsData.slice(0, 5).map((contact) => (
                      <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-blue-600">#{contact.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-medium">{contact.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{contact.email}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 max-w-md">
                          <div className="truncate" title={contact.message}>
                            {contact.message.length > 60 ? contact.message.substring(0, 60) + '...' : contact.message}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            contact.status === 'unread' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {contact.status === 'unread' ? <Clock size={12} /> : <CheckCircle size={12} />}
                            {contact.status || 'unread'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button
                            onClick={() => openModal(contact)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {Math.min(5, contactsData.length)} of {contactsData.length} messages
                </p>
                
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for viewing full message and editing status */}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">From</label>
                  <p className="text-gray-900 font-medium mt-1">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <p className="text-gray-900 mt-1">{selectedContact.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Date Received</label>
                <p className="text-gray-900 mt-1">
                  {new Date(selectedContact.created_at).toLocaleString()}
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                  {!editingStatus ? (
                    <button
                      onClick={() => setEditingStatus(true)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingStatus(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                
                {editingStatus ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                    </select>
                    <button
                      onClick={() => updateContactStatus(selectedContact.id, newStatus)}
                      disabled={updatingStatus}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      {updatingStatus ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                  </div>
                ) : (
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedContact.status === 'unread' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedContact.status === 'unread' ? <Clock size={14} /> : <CheckCircle size={14} />}
                    {selectedContact.status || 'unread'}
                  </span>
                )}
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}