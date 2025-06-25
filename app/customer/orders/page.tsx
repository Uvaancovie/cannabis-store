'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/contexts/AuthContext';
import CustomerNavigation from '../../../src/components/CustomerNavigation';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default function CustomerOrders() {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2025-06-20',
      status: 'delivered',
      total: 79.98,
      items: [
        { name: 'Premium CBD Oil', quantity: 1, price: 49.99 },
        { name: 'Cannabis Gummies', quantity: 1, price: 29.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2025-06-23',
      status: 'shipped',
      total: 39.99,
      items: [
        { name: 'THC Vape Cartridge', quantity: 1, price: 39.99 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2025-06-25',
      status: 'pending',
      total: 35.00,
      items: [
        { name: 'Hybrid Flower', quantity: 1, price: 35.00 }
      ]
    }
  ]);

  // Protect the customer route
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push('/auth/login');
      } else if (userRole !== 'customer') {
        router.push('/');
      }
    }
  }, [currentUser, userRole, loading, router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!currentUser || userRole !== 'customer') {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerNavigation />

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="mt-2 text-gray-600">Track your order history and status.</p>
          </header>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No orders found</p>
              <button 
                onClick={() => router.push('/customer/shop')}
                className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-medium text-gray-900">Order {order.id}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                        <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                        <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Items:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View Details
                      </button>
                      {order.status === 'delivered' && (
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Reorder
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
