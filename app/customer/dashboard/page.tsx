'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../../src/contexts/AuthContext';
import CustomerNavigation from '../../../src/components/CustomerNavigation';
import { Product, getActiveProducts } from '../../../src/services/productService';

export default function CustomerDashboard() {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  console.log('Customer Dashboard - Auth state:', { currentUser: !!currentUser, userRole, loading });
  // Protect the customer route and load products
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push('/auth/login');
      } else if (userRole !== 'customer') {
        router.push('/'); // Redirect non-customer users to home
      } else {
        loadFeaturedProducts();
      }
    }
  }, [currentUser, userRole, loading, router]);

  const loadFeaturedProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const products = await getActiveProducts();
      // Get first 3 products as featured
      setFeaturedProducts(products.slice(0, 3));
    } catch (error) {
      console.error('Error loading featured products:', error);
      // Keep empty array if error
      setFeaturedProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  if (!currentUser || userRole !== 'customer') {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Customer Navigation */}
      <CustomerNavigation />

      {/* Customer Dashboard Content */}
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="mt-2 text-gray-600">Browse our latest products and special offers.</p>
          </div>
        </header>
        
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">            {/* Featured Products */}
            <div className="px-4 py-8 sm:px-0">
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
              
              {isLoadingProducts ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
                      <div className="h-48 bg-gray-300"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>              ) : featuredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                      <div className="relative h-48 w-full">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          style={{objectFit: 'cover'}}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                        <p className="mt-2 text-lg font-semibold text-green-600">${product.price.toFixed(2)}</p>
                        <div className="mt-4 flex justify-between">
                          <Link 
                            href={`/customer/products/${product.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                          >
                            View Details
                          </Link>
                          <button 
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products available yet.</p>
                  <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
                </div>
              )}
              <div className="mt-8 text-center">
                <Link 
                  href="/customer/shop"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
