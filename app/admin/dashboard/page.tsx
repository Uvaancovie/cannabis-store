'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../src/contexts/AuthContext';

export default function AdminDashboard() {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();

  // Protect the admin route
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push('/auth/login');
      } else if (userRole !== 'admin') {
        router.push('/'); // Redirect non-admin users to home
      }
    }
  }, [currentUser, userRole, loading, router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!currentUser || userRole !== 'admin') {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header/Navbar */}
      <nav className="bg-green-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">Cannabis Marketplace Admin</span>
            </div>
            <div className="flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                <button 
                  onClick={() => router.push('/')}
                  className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => useAuth().logout()}
                  className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Dashboard Content */}
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Admin Action Cards */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Product Management</h3>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Add, edit, or remove products from your store inventory.</p>
                    </div>
                    <div className="mt-5">
                      <Link 
                        href="/admin/products"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                      >
                        Manage Products
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Order Management</h3>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>View and manage customer orders.</p>
                    </div>
                    <div className="mt-5">
                      <Link 
                        href="/admin/orders"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                      >
                        View Orders
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Manage user accounts and permissions.</p>
                    </div>
                    <div className="mt-5">
                      <Link 
                        href="/admin/users"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                      >
                        Manage Users
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>View sales reports and customer analytics.</p>
                    </div>
                    <div className="mt-5">
                      <Link 
                        href="/admin/analytics"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                      >
                        View Analytics
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
