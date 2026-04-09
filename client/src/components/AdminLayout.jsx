import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, BarChart3, Users, ShoppingCart, Lock, Search, Bell, Home } from 'lucide-react';

export default function AdminLayout({ children }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Truck, label: 'Logistics', path: '/admin/logistics' },
    { icon: BarChart3, label: 'Charts and Tables', path: '/admin/charts' },
    { icon: ShoppingCart, label: 'Inventory', path: '/admin/inventory' },
    { icon: Users, label: 'Customer Management', path: '/admin/customers' },
    { icon: Lock, label: 'Sales', path: '/admin/sales' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded">
              <span className="text-white font-bold">HEXA</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline">HEXA</span>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="flex items-center gap-6">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
